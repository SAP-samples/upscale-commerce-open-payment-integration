import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  ActiveConfiguration,
  CalculatedCostForOrder,
  Channel,
  ConsentType,
  InitOpenPaymentResponse,
  Order,
  OrdersService,
  PaymentService,
  SupportedLocale,
} from "@caas/service-client-angular";
import {
  AppConfiguration,
  AppConfigurationService,
  ApplicationLocaleService,
  ConsentService,
  OpenPaymentService,
  ShoppingCartService,
} from "@upscale/web-storefront-sdk";
import {
  catchError,
  concatMap,
  concatMapTo,
  filter,
  mapTo,
  take,
  tap,
} from "rxjs/operators";
import { Router } from "@angular/router";
import { from, Observable, of, throwError } from "rxjs";

@Component({
  selector: "lib-klarna-checkout",
  templateUrl: "./klarna-checkout.component.html",
  styles: [],
})
export class KlarnaCheckoutComponent implements OnInit {
  @ViewChild("paymentMethodContainer", { static: false })
  paymentMethodContainer: ElementRef;

  appData: AppConfiguration;
  paymentConfigs: Array<ActiveConfiguration>;
  draftOrder: Order;
  upscalePaymentSessionID: string;
  localeString: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private paymentService: PaymentService,
    private appConfigService: AppConfigurationService,
    private router: Router,
    private openPaymentService: OpenPaymentService,
    private consentService: ConsentService,
    private orderBrokerService: OrdersService,
    private localeService: ApplicationLocaleService
  ) {}

  ngOnInit(): void {
    this.localeService
      .get()
      .pipe(
        tap((supportedLocale: SupportedLocale) => {
          this.localeString = `${supportedLocale.language}-${supportedLocale.countryInfo.countryCode}`;
        }),
        concatMapTo(this.shoppingCartService.draftOrder),
        concatMap((cart) => {
          if (cart) {
            return of(cart);
          } else {
            return from(this.router.navigate([this.localeString, "cart"])).pipe(
              mapTo(undefined as void)
            );
          }
        }),
        filter((cart): cart is Order => Boolean(cart)),
        tap((cart) => {
          this.draftOrder = cart;
        }),
        take(1),
        concatMapTo(
          this.appConfigService.appConfiguration.pipe(
            take(1),
            tap((appData) => {
              this.appData = appData;
            })
          )
        )
      )
      .pipe(
        concatMapTo(this.consentService.consentsStatus),
        concatMap((consents) =>
          this.orderBrokerService.updateOrder(
            this.draftOrder.orderId,
            {
              consent: consents?.filter(
                (consent) =>
                  consent.consentTemplateType === ConsentType.PPANDTOS ||
                  consent.consentTemplateType === ConsentType.NEXTSELL
              ),
            },
            { orderLineResponseViewType: true }
          )
        ),
        concatMap(() => this.conditionalCalculateCost()),
        concatMap(() =>
          this.paymentService.getActiveConfigurationV2({
            divisionId: this.appData.experience.divisionId,
          })
        ),
        concatMap((configs) => {
          const klarnaConfig = configs.find((config) => {
            return config.gatewayProviderName === "klarna-checkout";
          });

          if (!klarnaConfig) {
            return from(this.router.navigate([this.localeString, "cart"])).pipe(
              mapTo(undefined as void)
            );
          }

          const currentDate = new Date();
          const timezoneOffset = currentDate.getTimezoneOffset();
          const baseURI = document?.baseURI ?? "";
          const url = `${baseURI}${this.localeString}/redirect-result/checkout`;

          return this.paymentService.opfInitiate({
            accountId: klarnaConfig.id,
            orderId: this.draftOrder.orderId,
            resultURL: url,
            cancelURL: url,
            channel: Channel.BROWSER,
            browserInfo: {
              colorDepth: window?.screen?.colorDepth,
              javaEnabled: window?.navigator?.javaEnabled(),
              javaScriptEnabled: true,
              language: window?.navigator?.language,
              screenHeight: window?.screen?.height,
              screenWidth: window?.screen?.width,
              userAgent: window?.navigator?.userAgent,
              timezoneOffset,
              originUrl: window?.location?.origin,
            },
          });
        }),
        filter((initResponse): initResponse is InitOpenPaymentResponse =>
          Boolean(initResponse)
        ),
        tap((initResponse) => {
          this.upscalePaymentSessionID = initResponse.upscalePaymentSessionID;
        }),
        concatMap((initResponse) =>
          this.openPaymentService
            .loadResources({
              scripts: initResponse.dynamicScript?.jsUrls,
              styles: initResponse.dynamicScript?.cssUrls,
            })
            .pipe(mapTo(initResponse))
        ),
        tap((initResponse) =>
          this.openPaymentService.renderHtml(
            this.paymentMethodContainer,
            initResponse.dynamicScript?.html
          )
        ),
        catchError((error: Error) => {
          return throwError(`PAYMENT_INIT_FAILED: ${error?.message}`);
        })
      )
      .subscribe();
  }

  private conditionalCalculateCost(): Observable<void | CalculatedCostForOrder> {
    let calculateCostRequest: Observable<void | CalculatedCostForOrder> = of(
      void 0
    );
    const shippingAddress = this.draftOrder.shippingAddress;
    if (shippingAddress) {
      const { city, state, zip, country } = shippingAddress;
      calculateCostRequest = this.orderBrokerService.calculateCost(
        this.draftOrder.orderId,
        {
          shippingAddress: {
            city,
            state,
            zip,
            country,
          },
        },
        { orderLineResponseViewType: true }
      );
    }
    return calculateCostRequest;
  }
}

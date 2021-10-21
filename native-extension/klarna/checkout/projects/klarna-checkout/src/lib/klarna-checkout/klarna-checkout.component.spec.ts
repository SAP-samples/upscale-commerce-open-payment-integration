import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
	AppLoggerService,
	createMockExperience,
	createMockOrder,
	ErrorSchema,
	MockAppLoggerService,
	MockOrdersService,
	MockPaymentService,
	OrdersService,
	PaymentProvider,
	PaymentService,
	SupportedLocale,
} from '@upscale/service-client-angular';
import {
	AppConfiguration,
	AppConfigurationService,
	ApplicationLocaleService,
	ConsentService,
	OpenPaymentService,
	ShoppingCartService,
	Templates,
} from '@upscale/web-storefront-sdk';
import { of, throwError } from 'rxjs';

import { KlarnaCheckoutComponent } from './klarna-checkout.component';

describe('KlarnaCheckoutComponent', () => {
	let component: KlarnaCheckoutComponent;
	let fixture: ComponentFixture<KlarnaCheckoutComponent>;

	let appLogger: AppLoggerService;
	let applicationLocale: ApplicationLocaleService;
	let paymentService: PaymentService;
	let router: Router;

	beforeEach(async () => {
		const mockAppConfigurationService = jasmine.createSpyObj('AppConfigurationService', [], {
			appConfiguration: of(createApplicationConfiguration()),
		});
		const mockApplicationLocaleService = jasmine.createSpyObj('ApplicationLocaleService', [ 'get' ]);
		const mockConsentService = jasmine.createSpyObj('ConsentService', [], {
			consentsStatus: of([]),
		});
		const mockOpenPaymentService = jasmine.createSpyObj('OpenPaymentService', [ 'renderHtml', 'loadResources' ]);
		const mockRouter = jasmine.createSpyObj('Router', {
			navigate: Promise.resolve(true),
		});
		const mockShoppingCartService = jasmine.createSpyObj('ShoppingCartService', [], {
			draftOrder: of(createMockOrder('order001')),
		});

		await TestBed.configureTestingModule({
			declarations: [ KlarnaCheckoutComponent ],
			providers: [
				{ provide: AppConfigurationService, useValue: mockAppConfigurationService },
				{ provide: AppLoggerService, useClass: MockAppLoggerService }, 
				{ provide: ApplicationLocaleService, useValue: mockApplicationLocaleService },
				{ provide: ConsentService, useValue: mockConsentService },
				{ provide: OpenPaymentService, useValue: mockOpenPaymentService },
				{ provide: OrdersService, useClass: MockOrdersService },
				{ provide: PaymentService, useClass: MockPaymentService },
				{ provide: Router, useValue: mockRouter },
				{ provide: ShoppingCartService, useValue: mockShoppingCartService },
			],
		})
		.compileComponents();

		appLogger = TestBed.inject(AppLoggerService);
		applicationLocale = TestBed.inject(ApplicationLocaleService);
		paymentService = TestBed.inject(PaymentService);
		router = TestBed.inject(Router);

		spyOn(appLogger, 'debugLog').and.returnValue(of(undefined));
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KlarnaCheckoutComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		(<jasmine.Spy>applicationLocale.get).and.returnValue(of(createSupportedLocale()));

		spyOn(paymentService, 'getActiveConfigurationV2').and.returnValue(
			of([
				{
					id: 0,
					merchantId: 'joy',
					gatewayProviderName: 'klarna-checkout',
					active: true,
					mode: 'LIVE',
					provider: PaymentProvider.UPSCALE_GATEWAY,
					createdAt: '',
					updatedAt: '',
				},
			]),
		);

		spyOn(paymentService, 'opfInitiate').and.returnValue(
			of(<any>{
				upscalePaymentSessionID: 'session001',
			})
		);

		const openPaymentService = TestBed.inject(OpenPaymentService);
		(<jasmine.Spy>openPaymentService.loadResources).and.returnValue(of(undefined));

		fixture.detectChanges();

		expect(component).toBeTruthy();
	});

	it('should alert the user and redirect them if a locale could not be fetched', () => {
		const error: ErrorSchema = {
			status: 500,
			type: 'internal_server_error',
			message: '',
		};

		(<jasmine.Spy>applicationLocale.get).and.returnValue(throwError(error));

		fixture.detectChanges();

		// TODO: unit test for alert when it's decided what alert to use

		expect(appLogger.debugLog).toHaveBeenCalledOnceWith(
			JSON.stringify(
				{
					description: 'Klarna Checkout could not be initialized.',
					error: {
						message: '',
						status: 500,
					},
				}
			)
		);
		expect(router.navigate).toHaveBeenCalledOnceWith([ undefined, "cart" ]);
	});

	it('should alert the user and redirect them if the order could not be updated', () => {
		const error: ErrorSchema = {
			status: 500,
			type: 'internal_server_error',
			message: '',
		};

		(<jasmine.Spy>applicationLocale.get).and.returnValue(of(createSupportedLocale()));

		const ordersService = TestBed.inject(OrdersService);
		spyOn(ordersService, 'updateOrder').and.returnValue(throwError(error));

		fixture.detectChanges();

		// TODO: unit test for alert when it's decided what alert to use

		expect(applicationLocale.get).toHaveBeenCalledOnceWith();

		expect(appLogger.debugLog).toHaveBeenCalledOnceWith(
			JSON.stringify(
				{
					description: 'Klarna Checkout could not be initialized.',
					error: {
						message: '',
						status: 500,
					},
				}
			)
		);
		expect(router.navigate).toHaveBeenCalledOnceWith([ 'sv-SE', "cart" ]);
	});

	it('should alert the user and redirect them if the payment configuration could not be fetched', () => {
		const error: ErrorSchema = {
			status: 500,
			type: 'internal_server_error',
			message: '',
		};

		(<jasmine.Spy>applicationLocale.get).and.returnValue(of(createSupportedLocale()));

		spyOn(paymentService, 'getActiveConfigurationV2').and.returnValue(throwError(error));

		fixture.detectChanges();

		// TODO: unit test for alert when it's decided what alert to use

		expect(applicationLocale.get).toHaveBeenCalledOnceWith();

		expect(paymentService.getActiveConfigurationV2).toHaveBeenCalledOnceWith({ divisionId: 'division001' });

		expect(appLogger.debugLog).toHaveBeenCalledOnceWith(
			JSON.stringify(
				{
					description: 'Klarna Checkout could not be initialized.',
					error: {
						message: '',
						status: 500,
					},
				}
			)
		);
		expect(router.navigate).toHaveBeenCalledOnceWith([ 'sv-SE', "cart" ]);
	});

	it('should alert the user and redirect them if payment cannot be initiated', () => {
		const error: ErrorSchema = {
			status: 500,
			type: 'internal_server_error',
			message: '',
		};

		(<jasmine.Spy>applicationLocale.get).and.returnValue(of(createSupportedLocale()));

		spyOn(paymentService, 'getActiveConfigurationV2').and.returnValue(
			of([
				{
					id: 0,
					merchantId: 'joy',
					gatewayProviderName: 'klarna-checkout',
					active: true,
					mode: 'LIVE',
					provider: PaymentProvider.UPSCALE_GATEWAY,
					createdAt: '',
					updatedAt: '',
				},
			]),
		);

		spyOn(paymentService, 'opfInitiate').and.returnValue(throwError(error));

		fixture.detectChanges();

		expect(applicationLocale.get).toHaveBeenCalledOnceWith();

		expect(paymentService.getActiveConfigurationV2).toHaveBeenCalledOnceWith({ divisionId: 'division001' });

		expect(paymentService.opfInitiate).toHaveBeenCalledTimes(1);

		// TODO: unit test for alert when it's decided what alert to use

		expect(appLogger.debugLog).toHaveBeenCalledOnceWith(
			JSON.stringify(
				{
					description: 'Klarna Checkout could not be initialized.',
					error: {
						message: '',
						status: 500,
					},
				}
			)
		);
		expect(router.navigate).toHaveBeenCalledOnceWith([ 'sv-SE', "cart" ]);
	});

	function createApplicationConfiguration(): AppConfiguration {
		return {
			templates: new Templates([]),
			editionId: 'edition001',
			experienceId: 'experience001',
			applePayEnabled: false,
			googlePayEnabled: false,
			deviceDiscovery: false,
			experience: createMockExperience('experience001', { divisionId: 'division001' }),
			showIncludeTax: false,
			showTaxSummary: false,
			useAsync: false,
			currencyCode: 'kr',
			currencyLocaleId: 'kr',
			languageLocaleId: 'sv-SE',
			customAttributeConfig: of([]),
			validShippingRegions: of([]),
			languagePack: <any>{ replace: str => str},
			supportedLocales: [],
			stylingAttributes: <any>{},
			variantAttributeConfigs: of([]),
		};
	}

	function createSupportedLocale(): SupportedLocale {
		return {
			language: 'sv',
			defaultFlag: true,
			label: '',
			script: '',
			nativeLanguageLabel: '',
			countryInfo: {
				countryCode: 'SE',
				region: '',
				nationalFlagImage: '',
			},
		};
	}
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createMockExperience, createMockOrder, MockOrdersService, MockPaymentService, OrdersService, PaymentProvider, PaymentService, SupportedLocale } from '@upscale/service-client-angular';
import { AppConfiguration, AppConfigurationService, ApplicationLocaleService, ConsentService, OpenPaymentService, ShoppingCartService, Templates } from '@upscale/web-storefront-sdk';
import { of } from 'rxjs';

import { KlarnaCheckoutComponent } from './klarna-checkout.component';

describe('KlarnaCheckoutComponent', () => {
	let component: KlarnaCheckoutComponent;
	let fixture: ComponentFixture<KlarnaCheckoutComponent>;

	beforeEach(async () => {
		const mockAppConfigurationService = jasmine.createSpyObj('AppConfigurationService', [], {
			appConfiguration: of(createApplicationConfiguration()),
		});
		const mockApplicationLocaleService = jasmine.createSpyObj('ApplicationLocaleService', [ 'get' ]);
		const mockConsentService = jasmine.createSpyObj('ConsentService', [], {
			consentsStatus: of([]),
		});
		const mockOpenPaymentService = jasmine.createSpyObj('OpenPaymentService', [ 'renderHtml', 'loadResources' ]);
		const mockRouter = jasmine.createSpyObj('Router', [ 'navigate' ]);
		const mockShoppingCartService = jasmine.createSpyObj('ShoppingCartService', [], {
			draftOrder: of(createMockOrder('order001')),
		});

		await TestBed.configureTestingModule({
			declarations: [ KlarnaCheckoutComponent ],
			providers: [
				{ provide: AppConfigurationService, useValue: mockAppConfigurationService },
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
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KlarnaCheckoutComponent);
		component = fixture.componentInstance;
	});

	function createApplicationConfiguration(): AppConfiguration {
		return {
			templates: new Templates([]),
			editionId: 'edition001',
			experienceId: 'experience001',
			applePayEnabled: false,
			googlePayEnabled: false,
			deviceDiscovery: false,
			experience: createMockExperience('experience001'),
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

	it('should create', () => {
		const applicationLocale = TestBed.inject(ApplicationLocaleService);
		(<jasmine.Spy>applicationLocale.get).and.returnValue(
			of(
				createSupportedLocale()
			)
		);

		const paymentService = TestBed.inject(PaymentService);
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
			])
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
});

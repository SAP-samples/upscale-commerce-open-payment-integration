import { NgModule } from "@angular/core";
import { CmsConfig, provideDefaultConfig, provideDefaultConfigFactory } from "@spartacus/core";
import { UpscaleExtensionModule } from "../klarna-checkout/klarna-checkout.module";
import { KlarnaCheckoutService } from "./klarna-checkout.service";

export function defaultKlarnaCheckoutConfig(): CmsConfig {
  const config: CmsConfig = {
      featureModules: {
          "klarna-checkout-trigger": {
              cmsComponents: ['klarna-checkout-component']
          }
      },
  }
  return config;
}


@NgModule({
    imports: [
        UpscaleExtensionModule,
    ],
    exports: [
        UpscaleExtensionModule,
    ],
    providers: [
        // If configFactory doesn't work, may want to try this? Also would not require cmsConfig in klarna-checkout.module:
        // provideDefaultConfig({
        //     cmsComponents: {
        //       "klarna-checkout-component": {
        //         component: KlarnaCheckoutComponent
        //       },
        //     },
        //   }),
        provideDefaultConfigFactory(defaultKlarnaCheckoutConfig),
    ],
})
export class KlarnaCheckoutRootModule {}
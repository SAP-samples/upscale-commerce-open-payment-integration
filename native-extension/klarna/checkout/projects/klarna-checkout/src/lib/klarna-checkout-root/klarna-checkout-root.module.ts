import { NgModule } from "@angular/core";
import { CmsConfig, provideDefaultConfig, provideDefaultConfigFactory } from "@spartacus/core";
import { KlarnaCheckoutComponent } from "klarna-checkout";

import { KlarnaCheckoutService } from "../klarna-checkout/klarna-checkout.service";

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
        // If klarna-checkout.service log not shown:
        // KlarnaCheckoutService
    ],
})
export class KlarnaCheckoutRootModule {}
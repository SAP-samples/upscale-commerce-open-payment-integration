import { NgModule } from "@angular/core";
import { provideDefaultConfig } from "@spartacus/core";

import { KlarnaCheckoutComponent } from "./klarna-checkout.component";

@NgModule({
  declarations: [KlarnaCheckoutComponent],
  exports: [KlarnaCheckoutComponent],
  // providers: [
  //   provideDefaultConfig({
  //     cmsComponents: {
  //       "klarna-checkout-component": {
  //         component: KlarnaCheckoutComponent
  //       },
  //     },
  //   }),
  // ]
})
export class UpscaleExtensionModule {}

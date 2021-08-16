import { NgModule } from "@angular/core";
import { RegistrationService } from "@upscale/web-storefront-sdk";
import { KlarnaCheckoutComponent } from "./klarna-checkout.component";

@NgModule({
  declarations: [KlarnaCheckoutComponent],
  exports: [KlarnaCheckoutComponent],
})

export class UpscaleExtensionModule {
  constructor(private registrationService: RegistrationService) {
    this.registrationService.register(
      "klarna-checkout",
      KlarnaCheckoutComponent
    );
  }
}

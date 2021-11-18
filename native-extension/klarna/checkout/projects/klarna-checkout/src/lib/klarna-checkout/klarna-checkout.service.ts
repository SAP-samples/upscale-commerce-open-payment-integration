import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KlarnaCheckoutService {

  constructor() {
    console.log("KLARNA CHECKOUT SERVICE EAGERLY INJECTED")
  }
}

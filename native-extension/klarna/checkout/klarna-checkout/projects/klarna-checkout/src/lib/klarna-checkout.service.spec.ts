import { TestBed } from '@angular/core/testing';

import { KlarnaCheckoutService } from './klarna-checkout.service';

describe('KlarnaCheckoutService', () => {
  let service: KlarnaCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlarnaCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

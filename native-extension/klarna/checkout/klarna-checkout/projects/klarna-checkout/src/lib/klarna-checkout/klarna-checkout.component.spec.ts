import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlarnaCheckoutComponent } from './klarna-checkout.component';

describe('KlarnaCheckoutComponent', () => {
  let component: KlarnaCheckoutComponent;
  let fixture: ComponentFixture<KlarnaCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlarnaCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlarnaCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

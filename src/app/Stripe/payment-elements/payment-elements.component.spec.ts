import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentElementsComponent } from './payment-elements.component';

describe('PaymentElementsComponent', () => {
  let component: PaymentElementsComponent;
  let fixture: ComponentFixture<PaymentElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

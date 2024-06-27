import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalLocationComponent } from './signal-location.component';

describe('SignalLocationComponent', () => {
  let component: SignalLocationComponent;
  let fixture: ComponentFixture<SignalLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

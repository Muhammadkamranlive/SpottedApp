import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaferJourneyComponent } from './safer-journey.component';

describe('SaferJourneyComponent', () => {
  let component: SaferJourneyComponent;
  let fixture: ComponentFixture<SaferJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaferJourneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaferJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

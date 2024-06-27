import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceComponent } from './residance.component';

describe('ResidanceComponent', () => {
  let component: ResidanceComponent;
  let fixture: ComponentFixture<ResidanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

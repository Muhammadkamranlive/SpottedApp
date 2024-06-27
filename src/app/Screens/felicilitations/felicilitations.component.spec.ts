import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicilitationsComponent } from './felicilitations.component';

describe('FelicilitationsComponent', () => {
  let component: FelicilitationsComponent;
  let fixture: ComponentFixture<FelicilitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FelicilitationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FelicilitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignalTypesComponent } from './admin-signal-types.component';

describe('AdminSignalTypesComponent', () => {
  let component: AdminSignalTypesComponent;
  let fixture: ComponentFixture<AdminSignalTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSignalTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSignalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

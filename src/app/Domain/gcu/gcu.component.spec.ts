import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCUComponent } from './gcu.component';

describe('GCUComponent', () => {
  let component: GCUComponent;
  let fixture: ComponentFixture<GCUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

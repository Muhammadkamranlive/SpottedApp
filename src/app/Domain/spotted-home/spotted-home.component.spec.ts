import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpottedHomeComponent } from './spotted-home.component';

describe('SpottedHomeComponent', () => {
  let component: SpottedHomeComponent;
  let fixture: ComponentFixture<SpottedHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpottedHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpottedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

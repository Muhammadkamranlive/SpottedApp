import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomProfileComponent } from './bottom-profile.component';

describe('BottomProfileComponent', () => {
  let component: BottomProfileComponent;
  let fixture: ComponentFixture<BottomProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

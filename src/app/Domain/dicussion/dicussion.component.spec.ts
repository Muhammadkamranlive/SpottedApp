import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicussionComponent } from './dicussion.component';

describe('DicussionComponent', () => {
  let component: DicussionComponent;
  let fixture: ComponentFixture<DicussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DicussionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DicussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicussionChatAssitanceComponent } from './dicussion-chat-assitance.component';

describe('DicussionChatAssitanceComponent', () => {
  let component: DicussionChatAssitanceComponent;
  let fixture: ComponentFixture<DicussionChatAssitanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DicussionChatAssitanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DicussionChatAssitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

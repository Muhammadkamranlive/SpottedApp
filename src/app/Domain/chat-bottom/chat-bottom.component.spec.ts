import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBottomComponent } from './chat-bottom.component';

describe('ChatBottomComponent', () => {
  let component: ChatBottomComponent;
  let fixture: ComponentFixture<ChatBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBottomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

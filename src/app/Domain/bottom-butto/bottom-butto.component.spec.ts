import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomButtoComponent } from './bottom-butto.component';

describe('BottomButtoComponent', () => {
  let component: BottomButtoComponent;
  let fixture: ComponentFixture<BottomButtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomButtoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomButtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

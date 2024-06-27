import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBatchComponent } from './top-batch.component';

describe('TopBatchComponent', () => {
  let component: TopBatchComponent;
  let fixture: ComponentFixture<TopBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

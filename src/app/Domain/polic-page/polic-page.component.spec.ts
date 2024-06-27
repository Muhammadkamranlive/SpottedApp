import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicPageComponent } from './polic-page.component';

describe('PolicPageComponent', () => {
  let component: PolicPageComponent;
  let fixture: ComponentFixture<PolicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAbendomentComponent } from './profile-abendoment.component';

describe('ProfileAbendomentComponent', () => {
  let component: ProfileAbendomentComponent;
  let fixture: ComponentFixture<ProfileAbendomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileAbendomentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileAbendomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

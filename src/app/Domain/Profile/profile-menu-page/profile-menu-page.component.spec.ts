import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuPageComponent } from './profile-menu-page.component';

describe('ProfileMenuPageComponent', () => {
  let component: ProfileMenuPageComponent;
  let fixture: ComponentFixture<ProfileMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileMenuPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

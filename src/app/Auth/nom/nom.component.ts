import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputConfig } from 'ng-otp-input';
import { AuthResponseModel } from '../../Models/Authentication/AuthResponse';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-nom',
  templateUrl: './nom.component.html',
  styleUrl: './nom.component.css'
})
export class NomComponent {
  loading:boolean=false;
  Gender: string[] = [
    'Male',
    'Female',
    'Other'
  ];
  Email    !: string;
  userForm !: FormGroup;
  res!:AuthResponseModel
  constructor
  (
    private api            : BaseApiService,
    private router         : Router,
    private auth           : AuthService,
    private messageService : MessageService,
    private formBuilder    : FormBuilder
  ) {
    this.Email = this.auth.getLoggedEmail();
  }

  onSubmit()
  {
   if(this.userForm.valid)
      {
        this.loading = true;
        this.api.update("Auth/UpdateProfile", this.userForm.value).subscribe
        (
          (response) =>
          {
            this.res=response
            if(this.res.message.includes("OK"))
            {
              this.auth.settingPayLoad(this.res);
              this.messageService.showSuccessAlert("User Personal Information Added Successfully.");
              this.loading = false;
              this.router.navigate(['/Residence']);
            }
           else
           {
              this.messageService.showErrorAlert(response.message);
              this.loading = false;
           }

          },
          (error) => {
            this.loading = false;
            this.messageService.showSuccessAlert(error);
          }
        );
   }


  }


  initializeForm() {
    this.userForm = this.formBuilder.group
    ({
      email: [this.Email],
      image  : ['',],
      legalname:['',Validators.required],
      surname:['',Validators.required],
      country:[''],
      gender:['',Validators.required],
      addresss:[''],
      postalCode:[''],
      nikName:['']
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}

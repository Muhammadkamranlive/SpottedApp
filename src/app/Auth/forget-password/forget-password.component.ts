import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  loading:boolean=false;
  otp!: string;
  userForm!: FormGroup;
  passForm!: FormGroup;
  errorMessage: any;
  showforget:boolean=false;


  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };





    constructor
    (
       private http: HttpClient,
       private auth:AuthService,
       private messageService: MessageService,
       private formBuilder:FormBuilder,
       private Api:BaseApiService,
       private router: Router
    )
    {

    }

    onOtpChange(otp:any) {
      this.otp = otp;
      this.passForm.get('otp')?.setValue(this.otp);
    }

    onSubmit() {

      if (this.userForm.valid) {
        this.loading=true;
        const formData = this.userForm.value;
        let Email=formData;
        this.Api.create("Auth/ForgotPassword",Email).subscribe(
          (response) => {
            this.loading=false;
            this.showforget=true;
            this.passForm.get('email')?.setValue(this.userForm.get('Email')?.value);
            this.messageService.showSuccessAlert(response.message)

          },
          ( error) => {

            this.loading=false;
            this.messageService.showErrorAlert(error);
          }
        );
      } else {
        this.userForm.markAllAsTouched();
      }
    }

    PassworRest() {
      if (this.passForm.valid) {
        this.loading=true;
        const formData = this.passForm.value;
        this.Api.create("Auth/RestPassword",formData).subscribe(
          (response) => {
            this.loading=false;
            this.messageService.showSuccessAlert(response.message);
            this.router.navigate(['/login'])
          },
          ( error) => {
            this.messageService.showErrorAlert(error);
            this.loading=false;
          }
        );
      } else {
        this.userForm.markAllAsTouched();
      }
    }
    initilizaform(){
      this.loading=true
      this.userForm = this.formBuilder.group(
        {
          Email: ['', [Validators.required, Validators.email]],
        }
       );
      this.loading=false;
    }
    PasswordForm(){
      this.loading=true
      this.passForm = this.formBuilder.group(
        {
             otp:[this.otp],
             email: ['', [Validators.required, Validators.email]],
             password:['',Validators.required]
        }
       );
    this.loading=false;
    }

  ngOnInit(): void {
    this.initilizaform();
    this.PasswordForm();
    this.passForm.get('email')?.setValue(this.userForm.get('Email')?.value);
  }

}

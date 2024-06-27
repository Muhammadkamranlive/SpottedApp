import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { NgOtpInputConfig } from 'ng-otp-input';
import { AuthResponseModel } from '../../Models/Authentication/AuthResponse';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent  {
  loading: boolean = false;
  otp: string='';
  Email!: string;
  userForm!: FormGroup;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  res!:AuthResponseModel
  constructor(
    private api: BaseApiService,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.Email = this.auth.getLoggedEmail();
  }



  onOtpChange(otp:any) {
    this.otp = otp;
  }

  confirmEmail() {
      const formData = { ...this.userForm.value, otp: this.otp};
      this.loading = true;
      this.api.create("Auth/ComfirmEmail", formData).subscribe(
        (response) =>
        {
          this.res=response
          if(this.res.message.includes("OK"))
          {
            this.auth.settingPayLoad(this.res);
            this.messageService.showSuccessAlert("Your email is successfully verified.");
            this.loading = false;
            this.router.navigate(['/Facilitation']);
          }
         else
         {
            this.messageService.showErrorAlert(response.message);
            this.loading = false;
            this.router.navigate(['/confirmEmail']);
         }

        },
        (error) => {
          this.loading = false;
          this.messageService.showSuccessAlert(error);
        }
      );

  }

  otpValidator(control: AbstractControl): ValidationErrors | null {
    const otp = control.value;
    if (otp === null || otp === '') {
      return null;
    }
    if (!/^\d+$/.test(otp)) {
      return { notNumber: true };
    }
    const otpValue = +otp;
    if (otpValue <= 0 || otpValue >= 100000000) {
      return { invalidRange: true };
    }
    return null;
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      email: [this.Email, [Validators.required]],
      otp: ['', [Validators.required, this.otpValidator]],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}

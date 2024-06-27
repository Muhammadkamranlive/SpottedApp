import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { MessageService } from '../../Services/message.service';
import { BaseApiService } from '../../Services/base-api.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrl: './otp-verify.component.css'
})
export class OtpVerifyComponent {
  loading:boolean=false;
  Email!:string
  constructor
  (
    private router: Router,
    private Auth:AuthService,
    private messageService:MessageService,
    private Api:BaseApiService
  )
  {
     this.Email=this.Auth.getLoggedEmail();
  }

  onSubmit()
  {
    if (this.Email!=null)
    {
      this.loading   = true;
      let Email=this.Email;
      this.Api.create("Auth/SendComfirmEmail",{Email}).subscribe(
        (response) =>
        {
           this.loading  = false;
           this.messageService.showSuccessAlert(response.message);
           this.router.navigate(["/otp"])
        },
        (error) => {
          this.loading = false
          this.messageService.showErrorAlert(error);
        }
      );
    }
    return true;
  }
}

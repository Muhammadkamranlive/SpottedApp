import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseModel } from '../../../Models/Authentication/AuthResponse';
import { AuthService } from '../../../Services/auth.service';
import { MessageService } from '../../../Services/message.service';
import { BaseApiService } from '../../../Services/base-api.service';

@Component({
  selector: 'app-profile-abendoment',
  templateUrl: './profile-abendoment.component.html',
  styleUrl: './profile-abendoment.component.css'
})
export class ProfileAbendomentComponent {
  loading:boolean=false;
  Email    !:string;
  res!:AuthResponseModel
  priceId!:string
  showUpgradePage:boolean=false;
  constructor
  (
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService,
    private api: BaseApiService,
  )
  {
      this.Email=this.auth.getLoggedEmail();
  }
  onSubmit()
  {
     if (this.priceId!=null)
     {
        this.loading         = true
        this.showUpgradePage =true;
        this.loading         =false;
     }
     else
     {
      this.messageService.showErrorAlert("No price id found");
     }
   }

  setPriceId(id:string)
  {
     this.priceId=id
  }

  StartTrial()
  {
   if(this.Email!=null)
      {
        this.loading = true;
        let email= this.Email;
        this.api.update("Auth/UpdatePaymentStatus", {email}).subscribe
        (
          (response) =>
          {
            this.res = response
            if(this.res.message.includes("OK"))
            {
              this.auth.settingPayLoad(this.res);
              this.messageService.showSuccessAlert("User Trial Started Successfully");
              this.loading = false;
            }
           else
           {
              this.messageService.showErrorAlert(this.res.message);
              this.loading = false;
           }

          },
          (error) => {
            this.loading = false;
            this.messageService.showSuccessAlert(error);
          }
        );
   }
   else{
    this.messageService.showSuccessAlert("Please provide neccessary details");
   }

  }
}

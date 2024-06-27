import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { AuthService } from '../../Services/auth.service';
import { PaymentSession } from '../../Models/Authentication/UserModel';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css'
})
export class UserPaymentsComponent implements OnInit{
  loading :boolean=false;
  TenantId:string=''
  Payment:PaymentSession[]=[]
  subtotall:number=0;
  email:string
  constructor
  (
    private api:BaseApiService,
    private messageService:MessageService,
    private auth:AuthService
  )
  {

    this.email= this.auth.getLoggedEmail()
  }


  GetTenantsPayments(TenantId:string)
  {
    try
    {
         this.loading=true;
         this.api.read(`Auth/GetClientPayments?email=${TenantId}`).subscribe(
         (response)=>
         {
           this.Payment   = response;
           this.subtotall = this.Payment.reduce((acc,res)=>acc+res.amount,0)
           this.subtotall = this.subtotall/100
           this.loading   = false;
         },
         (err)=>
         {
          this.loading = false;
          this.messageService.showErrorAlert(err.message);
         }
        )
    }
     catch (error)
    {
      this.messageService.showErrorAlert("something went wrong");
    }
  }
  ngOnInit()
  {

    this.GetTenantsPayments(this.email);
  }





getSeverity(status: string)
{
    switch (status.toLowerCase()) {
        case 'completed':
            return 'badge bg-success';

        case 'incompleted':
            return 'badge bg-danger';
    }
    return "badge bg-info";
}
}

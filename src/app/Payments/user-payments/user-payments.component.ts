import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { AuthService } from '../../Services/auth.service';
import { InvoiceSummary, PaymentSession } from '../../Models/Authentication/UserModel';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css'
})
export class UserPaymentsComponent implements OnInit{
  loading :boolean=false;
  subtotall:number=0
  Payments:InvoiceSummary[]=[]
  email:string
  loadButton:boolean=false;
  downloadurl:string=''
  itemId:string=''
  constructor
  (
    private api:BaseApiService,
    private messageService:MessageService,
    private auth:AuthService
  )
  {

    this.email= this.auth.getLoggedEmail()
  }

  DonwloadTenantsPayments(Invoice:string)
  {
    try
    {
      this.itemId=Invoice;
      this.loadButton=true;
      this.api.read(`Payments/DownloadInvoice?Invoice=${Invoice}`).subscribe(
         (response)=>
         {
           this.downloadurl  = response.message;
           this.loadButton   = false
         },
         (err)=>
         {
          this.loadButton    =false

         }
        )
    }
     catch (error)
    {

    }
  }

  GetTenantsPayments(TenantId:string)
  {
    try
    {
         this.loading=true;
         this.api.read(`Payments/GetMyInvoice?customerId=${TenantId}`).subscribe(
         (response)=>
         {
           this.loading    = false;
           this.Payments   = response.result;
           console.log(this.Payments)
          //  this.subtotall  = this.Payments.reduce((acc,res)=>acc+res.amount,0)
          //  this.subtotall  = this.subtotall

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

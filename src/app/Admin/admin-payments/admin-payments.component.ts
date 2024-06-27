import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AllUsers, AdminLogs, SignalIsues, NotificationMessages, InvoiceSummary } from '../../Models/Authentication/UserModel';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrl: './admin-payments.component.css'
})
export class AdminPaymentsComponent implements OnInit{
  loading:boolean=false;
  Users :AllUsers[]=[]
  Admins:AllUsers[]=[]
  Payments:InvoiceSummary[]=[]
  signalIssues:SignalIsues[]=[]
  signalVol:SignalIsues[]=[]
  signalAggression:SignalIsues[]=[]
  signalSexual:SignalIsues[]=[]
  signalSuspect:SignalIsues[]=[]
  notifications:NotificationMessages[]=[]
  userid:string=''
  amount:number=0;
  latestTimestamp!: string;
  itemId:string=''
  loadButton:boolean=false;
  downloadurl:string=''
  constructor
    (
     private api:BaseApiService,
     private messageService:MessageService,
     private auth:AuthService,
     private route: ActivatedRoute,
    )
  {

    this.userid=this.auth.getUID();
  }

  private findLatestTimestamp(): string {
    let latestTimestamp = '';

    for (const notification of this.notifications) {
      if (!latestTimestamp || new Date(notification.timestamp) > new Date(latestTimestamp)) {
        latestTimestamp = notification.timestamp;
      }
    }

    return latestTimestamp;
  }

  GetPayments(){
    this.loading=true;
    this.api.read("Payments/GetInvoices").subscribe
    (
      (response)=>{
        this.Payments     = response;
        this.loading      = false;
      }
      ,(
        error
      )=>{

        this.loading=false;
        this.messageService.showErrorAlert(error.message);
      }
    )
  }

  GetSignals()
  {
    this.loading=true;
    this.api.read("Singal").subscribe
    (
      (response)=>{
        this.signalIssues     = response;
        this.signalVol        = this.signalIssues.filter(x=>x.type=="Vol")
        this.signalAggression = this.signalIssues.filter(x=>x.type=="Agression")
        this.signalSuspect    = this.signalIssues.filter(x=>x.type=="suspect")
        this.signalSexual     = this.signalIssues.filter(x=>x.type=="Agression Sexuel")
        this.loading          = false;
      }
      ,(
        error
      )=>{

        this.loading=false;
        this.messageService.showErrorAlert(error.message);
      }
    )
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

  ngOnInit()
  {
     this.GetPayments();
  }
}

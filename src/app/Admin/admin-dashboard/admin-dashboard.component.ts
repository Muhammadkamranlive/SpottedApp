import { Component, OnInit } from '@angular/core';
import { AdminLogs, AllUsers, NotificationMessages, SignalIsues, UserDetail } from '../../Models/Authentication/UserModel';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  loading:boolean=false;
  Users :AllUsers[]=[]
  Admins:AllUsers[]=[]
  logs:AdminLogs[]=[]
  signalIssues:SignalIsues[]=[]
  signalVol:SignalIsues[]=[]
  signalAggression:SignalIsues[]=[]
  signalSexual:SignalIsues[]=[]
  signalSuspect:SignalIsues[]=[]
  notifications:NotificationMessages[]=[]
  userid:string=''
  amount:number=0;
  constructor
    (
     private api:BaseApiService,
     private messageService:MessageService,
     private auth:AuthService
    )
  {

    this.userid=this.auth.getUID();
  }


  getdat(){
    this.loading=true;
    this.api.read("Auth/GetusersAll").subscribe
    (
      (response)=>{
        this.Users  = response;
        this.Admins = this.Users.filter(x=>x.roles==="Administrator")
        this.GetNotifications(this.userid);
        this.GetLogs();
        this.loading=false;
      }
      ,(
        error
      )=>{
        console.log(error)
        this.loading=false;
        this.messageService.showErrorAlert(error.message);
      }
    )
  }

  getAmount(){
    this.loading=true;
    this.api.read("Auth/getPaymentsClient1").subscribe
    (
      (response)=>
      {
        this.amount  = response;
        this.loading = false;
      }
      ,(
        error
      )=>
      {
        this.loading=false;
        this.messageService.showErrorAlert(error.message);
      }
    )
  }
  GetNotifications(userId:string){
    this.loading=true;
    this.api.read(`Singal/Notifications?userid=${userId}`).subscribe
    (
      (response)=>{
        this.notifications = response;
        this.loading       = false;
      }
      ,(
        error
      )=>{

        this.loading=false;
        this.messageService.showErrorAlert(error.message);
      }
    )
  }

  GetLogs(){
    this.loading=true;
    this.api.read("AdminLogs").subscribe
    (
      (response)=>{
        this.logs     = response;
        this.loading  = false;
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

  ngOnInit()
  {
     this.GetSignals();
     this.getAmount();
     this.getdat();

  }
}

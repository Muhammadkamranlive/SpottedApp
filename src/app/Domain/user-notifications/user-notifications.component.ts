import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllUsers, AdminLogs, SignalIsues, NotificationMessages } from '../../Models/Authentication/UserModel';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';


@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrl: './user-notifications.component.css'
})
export class UserNotificationsComponent implements OnInit{
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
  userid:string
  amount:number=0;
  latestTimestamp!: string;
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



  GetNotifications(userId:string){
    this.loading=true;
    this.api.read(`Singal/Notifications?userid=${userId}`).subscribe
    (
      (response)=>{
        this.notifications   = response;
        this.latestTimestamp = this.findLatestTimestamp();
        this.loading         = false;
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
    this.GetNotifications(this.userid)
  }
}

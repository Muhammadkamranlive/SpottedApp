import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AllUsers, AdminLogs, SignalIsues, NotificationMessages } from '../../Models/Authentication/UserModel';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-signal-types',
  templateUrl: './admin-signal-types.component.html',
  styleUrl: './admin-signal-types.component.css'
})
export class AdminSignalTypesComponent implements OnInit{
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
  latestTimestamp!: string;
  itemId:string=''
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

  GetSignals(signalType:string)
  {
    this.loading=true;
    this.api.read(`Singal/GetSignalAll?signalType=${signalType}`).subscribe
    (
      (response)=>{
        this.signalIssues     = response;
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
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.GetSignals(this.itemId)
    })
  }


  getBackgroundColor(signalType: string): string
  {
    switch (signalType) {
      case 'Vol':
        return '#FF3131';
      case 'Agression':
        return '#FF7B31'; // Example color for Agression
      case 'suspect':
        return '#FFC52F'; // Example color for Suspect
      case 'Agression Sexuel':
        return '#9747FF'; // Example color for Agression Sexuel
      default:
        return '#9747FF'; // Default color
    }
  }

  getBackgroundImage(signalType: string): string
  {
    switch (signalType) {
      case 'Vol':
        return '#FF3131';
      case 'Agression':
        return '#FF7B31'; // Example color for Agression
      case 'suspect':
        return '#FFC52F'; // Example color for Suspect
      case 'Agression Sexuel':
        return '../../../assets/images/Screeens/sss.png'; // Example color for Agression Sexuel
      default:
        return '../../../assets/images/Screeens/sss.png'; // Default color
    }
  }

  customSwal(message:string){

    Swal.fire({
      html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
      <small class="small-text">
       Details
      </small>
      <br>
      <p class="p-2">${message}</p>
      `,
      icon: undefined, // Disable the default icon
      confirmButtonText: 'Ok',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button',
      },
      width: '300px'
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

import { UserDetail } from '../../Models/Authentication/UserModel';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  userId!:string;
  user!:UserDetail
  loading:boolean=false;
  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private api: BaseApiService,
  ){
    this.userId   = this.auth.getUID();
  }


  getdata(uid:any)
  {
    this.loading=true;
    this.api.read(`Auth/getProfile?uid=${uid}`).subscribe
    (
      (response)=>{
        this.user    = response;
        this.loading = false;
      }
      ,(
        error
      )=>{

        this.loading=false;
        this.messageService.showErrorAlert(error);
      }
    )
  }

  GetBatch(batch:string){
   return this.auth.GetBatach(batch)
  }
  Logout(){
    this.auth.logout();
  }
  ngOnInit(): void {
    this.getdata(this.userId);
  }
}

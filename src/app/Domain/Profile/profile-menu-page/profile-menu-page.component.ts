import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from '../../../Models/Authentication/UserModel';
import { AuthService } from '../../../Services/auth.service';
import { BaseApiService } from '../../../Services/base-api.service';
import { MessageService } from '../../../Services/message.service';
import { ShareService } from '../../../Services/share.service';

@Component({
  selector: 'app-profile-menu-page',
  templateUrl: './profile-menu-page.component.html',
  styleUrl: './profile-menu-page.component.css'
})
export class ProfileMenuPageComponent implements OnInit {
  loading:boolean=false;
  userId:string;
  user!:UserDetail
  constructor
  (
    private auth: AuthService,
    private messageService: MessageService,
    private api: BaseApiService,
    private router:Router,
    private shareService: ShareService
  )
  {

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

  ngOnInit(): void {
    this.getdata(this.userId);
  }


  shareContent() {
    this.shareService.shareContent({
      title: 'Check this out! Spotted App',
      text: 'Le "Waze des piétons à Paris',
      url: 'https://admin-spotted.web.app'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { UserData, UserDetail } from '../../Models/Authentication/UserModel';

@Component({
  selector: 'app-felicilitations',
  templateUrl: './felicilitations.component.html',
  styleUrl: './felicilitations.component.css'
})
export class FelicilitationsComponent implements OnInit {
  loading:boolean=false;
  userId:string;
  user!:UserDetail
  constructor
  (
    private auth: AuthService,
    private messageService: MessageService,
    private api: BaseApiService,
    private router:Router

  )
  {

    this.userId   = this.auth.getUID();

  }
  onSubmit() {
    this.loading=true;
    setTimeout(() => {
      this.loading=false;
      this.router.navigate(['/userHome']);
    }, 2000);
  }

  getdata(uid:any)
  {
    this.loading=true;
    this.api.read(`Auth/getProfile?uid=${uid}`).subscribe
    (
      (response)=>{
        this.user    = response;
        this.loading =false;
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
}

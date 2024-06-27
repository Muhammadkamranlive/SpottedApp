import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.css'
})
export class BottomNavigationComponent implements OnInit {
  isDarkTheme: boolean = false;
  userRole!:string
  //user1!:UserData
  loading:boolean=false;
  username:string=''
  userId:string=''
  isActive:boolean=false
  constructor
  (
    private api: BaseApiService,
   private messageService: MessageService,
    private auth:AuthService,
    private router: Router
  )
  {
    this.userId = this.auth.getUID();
    this.userRole=this.auth.getRoles().toString();
  }

  getClassForRoute(route: string): string {
     this.isActive = this.router.isActive(route, true);

    if (this.isActive) {
      return 'icon icon-shape icon-xl rounded-circle  mt-n7 active';
    } else {
      return 'icon';
    }
  }

  // GetAll(uid:any){
  //   this.loading=true;
  //   this.api.read(`Auth/getByIdDT?uid=${uid}`).subscribe
  //   (
  //     (response)=>{
  //       this.user1 = response;
  //       this.username = this.username+this.user1.userName
  //       this.loading=false;
  //     }
  //     ,(
  //       error
  //     )=>{

  //       this.loading=false;
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  //     }
  //   )
  //  }


  //  toggleTheme() {
  //   this.isDarkTheme = !this.isDarkTheme;
  //   if (this.isDarkTheme) {
  //     document.documentElement.setAttribute('data-theme', 'dark');
  //     localStorage.setItem('theme', 'dark');
  //   } else {
  //     document.documentElement.setAttribute('data-theme', 'light');
  //     localStorage.setItem('theme', 'light');
  //   }

  // }

  logOut(){
    // this.auth.logout();
    // this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  //  if(this.userId!=''){
  //   this.GetAll(this.userId)
  //  }
  }
}

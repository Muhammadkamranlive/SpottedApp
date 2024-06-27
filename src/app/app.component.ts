// import { App } from '@capacitor/app';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'Spotted';

  constructor(private router: Router,private auth:AuthService) {}
  getUserHome(){
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/SpottedHome'])
    }
  }
  ngOnInit(): void {
   // this.getUserHome();
  }
}

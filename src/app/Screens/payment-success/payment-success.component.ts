import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent  {
 pay:string="false";
 constructor
 (
    private auth:AuthService
 )
 {

 }

}

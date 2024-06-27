import { SignalGroup } from './../../Models/Authentication/UserModel';
import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { BaseApiService } from "../../Services/base-api.service";
import { MessageService } from "../../Services/message.service";
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plugins, Capacitor } from '@capacitor/core';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent  implements OnInit {
  loading:boolean=false;
  userId:string;
  user:SignalGroup[]=[]
  userForm !: FormGroup;
  long:number=0
  lat:number=0;
  constructor
  (
    private auth: AuthService,
    private messageService: MessageService,
    private api: BaseApiService,
    private router:Router,
    private formBuilder    : FormBuilder

  )
  {

    this.userId   = this.auth.getUID();

  }



  initializeForm() {
    this.userForm = this.formBuilder.group
    ({
        location: [''],
        longitude:[0],
        latitude:[0]
    });
  }


  async getCurrentLocation(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      // Use Capacitor Geolocation for native platforms
      try {
        const permission = await Geolocation['requestPermissions']();
        if (permission.location === 'granted') {
          const position = await Geolocation['getCurrentPosition']();
          this.userForm.patchValue({
            location : '',
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
          });
          this.long = position.coords.longitude,
          this.lat  = position.coords.latitude
          this.getdata(this.userForm.value);
        } else {
          this.messageService.showErrorAlert('Location access is required for this application to function properly.');
        }
      } catch (error) {
        this.messageService.showErrorAlert('Error getting location: ');
      }
    } else {
      // Fallback to browser's geolocation for web platform
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userForm.patchValue({
              location : '',
              latitude : position.coords.latitude,
              longitude: position.coords.longitude
            });
            this.long = position.coords.longitude,
            this.lat  = position.coords.latitude
            this.getdata(this.userForm.value);
          },
          (error) => {
            this.messageService.showErrorAlert('Location access is required for this application to function properly.');
          }
        );
      } else {
        this.messageService.showErrorAlert('Geolocation is not supported by this device.');
      }
    }
  }








  private reverseGeocode(lat: number, lng: number): void {
    const geocoder = new google.maps.Geocoder();
    const latlng   = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          this.userForm.patchValue({
            location: results[0].formatted_address,
            latitude: lat,
            longitude: lng
          });
        } else {
          this.messageService.showErrorAlert('No results found');
        }
      } else {
        this.messageService.showErrorAlert('Geocoder failed due to: ' + status);
      }
      this.loading = false;
    });
  }

  getdata(uid:any)
  {
    this.loading=true;
    this.api.create("Singal/SearchMarkerCounts",uid).subscribe
    (
      (response)=>{
        this.user    = response;
        if(this.user.length==0)
        {

        }
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
    this.initializeForm();
    this.getCurrentLocation();

  }
}


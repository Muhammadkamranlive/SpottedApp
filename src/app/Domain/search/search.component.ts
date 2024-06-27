import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalGroup } from '../../Models/Authentication/UserModel';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { Plugins, Capacitor } from '@capacitor/core';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit{
  @ViewChild('autocomplete', { static: true }) autocompleteElement!: ElementRef;
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
        location:  [''],
        longitude: [0],
        latitude:  [0]
    });
  }



  private initAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if(place.geometry){
        this.userForm.patchValue({
          location  : place.formatted_address,
          latitude  : place.geometry.location?.lat(),
          longitude : place.geometry.location?.lng()
        });
        this.lat  = this.userForm.get('latitude')?.value
        this.long = this.userForm.get('longitude')?.value
      }
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
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
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
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });

            this.getdata();
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


  getdata()
  {
    this.loading=true;
    this.api.create("Singal/SearchMarkerCounts",this.userForm.value).subscribe
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
    this.initializeForm();
    this.initAutocomplete();

  }
}

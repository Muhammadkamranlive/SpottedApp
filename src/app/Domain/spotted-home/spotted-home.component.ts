import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseModel } from '../../Models/Authentication/AuthResponse';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { Plugins, Capacitor } from '@capacitor/core';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-spotted-home',
  templateUrl: './spotted-home.component.html',
  styleUrl: './spotted-home.component.css'
})
export class SpottedHomeComponent implements OnInit {
  @ViewChild('autocomplete', { static: true }) autocompleteElement!: ElementRef;
  loading:boolean=false;
  userId    !: string;
  userForm !: FormGroup;
  res!:AuthResponseModel
  selectedSignalType: string = '';
  center!: google.maps.LatLngLiteral;

  constructor
  (
    private api            : BaseApiService,
    private router         : Router,
    private auth           : AuthService,
    private messageService : MessageService,
    private formBuilder    : FormBuilder
  )
  {
    this.userId = this.auth.getUID();
  }

  onSubmit()
  {

    if(this.userForm.get('type')?.value=='')
    {
      this.messageService.showErrorAlert("Please select any Signal Type")
      this.loading=false;
    }
    else if (this.userForm.valid)
      {
        this.loading = true;
        const formData = { ...this.userForm.value };
        delete formData.id;
        this.api.create("Singal", formData).subscribe
        (
          (response) =>
          {
            this.res     =response
            this.loading =false;
            this.messageService.showSuccessAlert("Signal is added successfully");
            this.userForm.reset();
            this.initializeForm();
          },
          (error) => {
            this.loading = false;
            this.messageService.showErrorAlert(error);
          }
        );
   }


  }

  setSignalType(type:string)
  {
    this.selectedSignalType = type;
    this.userForm.get('type')?.setValue(type);
  }

  initializeForm() {
    this.userForm = this.formBuilder.group
    ({
        id: [''],
        userId: [this.userId],
        title: ["", Validators.required],
        description: ['', Validators.required],
        type: [''],
        when: ['', Validators.required],
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

  private initAutocomplete(): void
  {
     const autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement);
     autocomplete.addListener('place_changed', () => {
       const place = autocomplete.getPlace();
       if (place.geometry) {
        this.userForm.patchValue({
          title: place.formatted_address,
          latitude: place.geometry?.location?.lat(),
          longitude: place.geometry?.location?.lng()
        });
      }
     });
  }
  ngOnInit(): void
  {
     this.initializeForm();
     this.getCurrentLocation();
     this.initAutocomplete();

  }
}

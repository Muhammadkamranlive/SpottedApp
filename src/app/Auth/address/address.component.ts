import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseModel } from '../../Models/Authentication/AuthResponse';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent  implements OnInit{
  @ViewChild('addressauto', { static: false }) autocompleteElement!: ElementRef;
  loading:boolean=false;
  Email    !: string;
  userForm !: FormGroup;
  res!:AuthResponseModel
  constructor
  (
    private api            : BaseApiService,
    private router         : Router,
    private auth           : AuthService,
    private messageService : MessageService,
    private formBuilder    : FormBuilder
  ) {
    this.Email = this.auth.getLoggedEmail();
  }

  onSubmit()
  {
   if(this.userForm.valid)
      {
        this.loading = true;
        this.api.update("Auth/UpdateProfile", this.userForm.value).subscribe
        (
          (response) =>
          {
            this.res=response
            if(this.res.message.includes("OK"))
            {
              this.auth.settingPayLoad(this.res);
              this.messageService.showSuccessAlert("User country information is  added successfully.");
              this.loading = false;
              this.router.navigate(['/userHome']);
            }
           else
           {
              this.messageService.showErrorAlert(response.message);
              this.loading = false;
           }

          },
          (error) => {
            this.loading = false;
            this.messageService.showSuccessAlert(error);
          }
        );
   }
   else
   {
    this.messageService.showSuccessAlert("Please provide neccessary details");
   }

  }


  private initAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.userForm.get('address')?.setValue(place.formatted_address);
    });
  }

  initializeForm()
  {
    this.userForm = this.formBuilder.group
    ({
      email: [this.Email],
      image  : ['',],
      legalname:[''],
      surname:[''],
      country:[''],
      gender:[''],
      address:['',Validators.required],
      postalCode:[''],
      nikName:[''],
      appartment:['',Validators.required],
      city:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeForm();

  }

  ngAfterViewInit(): void {
    this.initAutocomplete();
  }
}

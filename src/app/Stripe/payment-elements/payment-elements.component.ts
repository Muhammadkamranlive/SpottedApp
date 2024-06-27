
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  injectStripe,
  StripePaymentElementComponent
} from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { PublicKey } from '../payment-keys/PaymentKeys';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from '../../Models/Authentication/UserModel';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-payment-elements',
  templateUrl: './payment-elements.component.html',
  styleUrl: './payment-elements.component.css'
})
export class PaymentElementsComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  loading:boolean=false;
  itemId!:string
  userId!:string;
  user!:UserDetail
  planName:string=''
  payment:string=''
  private readonly fb          = inject(UntypedFormBuilder);
  private readonly API         = inject(BaseApiService);
  constructor(
    private message:MessageService,
    private route: ActivatedRoute,
    private Auth:AuthService,
    private router:Router
  )
  {
     this.userId=this.Auth.getUID();
  }
  paymentElementForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    priceId: ['', [Validators.required]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
    clientSecret: ''
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  // Replace with your own public key
  stripe = injectStripe(PublicKey);
  paying = signal(false);

  InitPayment(){
    this.API
    .create(
    "Payments/create-payment-intent",
    {

        email: this.paymentElementForm.get('email')?.value,
        name: this.paymentElementForm.get('name')?.value,
        address: this.paymentElementForm.get('address')?.value,
        zipcode: this.paymentElementForm.get('zipcode')?.value,
        city: this.paymentElementForm.get('city')?.value,
        priceId: this.paymentElementForm.get('priceId')?.value
    })
    .subscribe(pi => {
      this.elementsOptions.clientSecret = pi.clientSecret  as string;
    });
  }

  setPaymentDetails()
  {
    if(this.itemId=="price_1PQYP7AsBlU4MIiY3qjxF7MC"){
      this.planName ="5,99 € par semaine"
      this.payment  ="5,99 €"
    }
    else if(this.itemId=="price_1PQYQXAsBlU4MIiYQAVNrX4x")
    {
      this.planName ="11,99 € par mois, soit seulement 0,44 € par jour"
      this.payment  ="11,99 €"
    }
  }


  getUserDetail(uid:any)
  {
    this.loading=true;
    this.API.read(`Auth/getProfile?uid=${uid}`).subscribe
    (
      (response)=>{
        this.user    = response;
        this.paymentElementForm.patchValue({
          email:this.user.email,
          name:this.user.legalname,
          address:this.user.addresss,
          zipcode:this.user.postalCode,
          city:this.user.city
        })
        this.loading = false;
      }
      ,(
        error
      )=>{

        this.loading=false;
        this.message.showErrorAlert(error);
      }
    )
  }

  ngOnInit() {
    this.getUserDetail(this.userId);
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.paymentElementForm.patchValue({
        priceId:this.itemId
      })
      this.setPaymentDetails();
      if(this.itemId!=null){
        this.InitPayment();
      }
    });

  }

  pay() {
    this.loading=true;
    this.paying.set(true);
    // if (this.paying() || this.paymentElementForm.invalid) return;

    const { name, email, address, zipcode, city } = this.paymentElementForm.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        this.loading=false;
        if (result.error)
        {
          this.message.showErrorAlert("Something went wrong could not proccss payment at this time.")
        }
        else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            this.message.showSuccessAlert("You successfully subscribed to payment plan.")
            this.router.navigate(["/Facilitation"])
          }
        }
      });
  }

}

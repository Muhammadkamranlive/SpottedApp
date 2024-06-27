import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { SignalGroup } from '../../Models/Authentication/UserModel';
import { MessageService } from '../../Services/message.service';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signal-location',
  templateUrl: './signal-location.component.html',
  styleUrl: './signal-location.component.css'
})
export class SignalLocationComponent implements OnInit{
  itemId!: string
  userId!:string
  userForm !: FormGroup;
  loading:boolean=false;
  user:SignalGroup[]=[]
  constructor
  (
    private messageService:MessageService,
    private auth           : AuthService,
    private api            : BaseApiService,
    private formBuilder    : FormBuilder,
    private router         : ActivatedRoute

  )
  {
    this.userId = this.auth.getUID();
  }


  ngOnInit(): void {

    this.initializeForm();
    this.router.params.subscribe(params => {
      this.itemId = params['location'];
      this.userForm.patchValue({
        location:this.itemId
      })
      if(this.itemId!=null){
        this.GetSignalLocation(this.userForm.value);
      }
    });

  }

  initializeForm()
  {
    this.userForm = this.formBuilder.group
    ({
        location:  [''],
        longitude: [0],
        latitude:  [0]
    });
  }

  GetSignalLocation(formData:any)
  {
    this.loading=true;
    this.api.create("Singal/SearchMarkerCounts",formData).subscribe
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

}

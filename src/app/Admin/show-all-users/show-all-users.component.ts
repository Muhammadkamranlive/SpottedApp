import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllUsers } from '../../Models/Authentication/UserModel';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {
    Users:AllUsers[]=[];
    loading:boolean=false
    id:string=''
    userForm!: FormGroup;
    constructor
    (
      private api:BaseApiService,
      private formBuilder:FormBuilder,
      private messageService:MessageService
    )
    {

    }

    getdat(){
      this.loading=true
      this.api.read("Auth/GetusersAll").subscribe
      (
        (response)=>{
          this.Users = response;
          console.log(this.Users);
          this.loading=false
        }

        ,(
          error
        )=>{
          this.loading=false
          this.messageService.showErrorAlert(error)
        }
      )
    }

    deleteRecords(id:any)
    {
      Swal.fire({
        html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
        <small class="small-text">Do you want to delete ?</small>`,
        icon: undefined, // Disable the default icon
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No!',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-custom-button',
          cancelButton:'swal2-custom-button1'
        },
        width: '300px'
      }).then((result) =>
      {
        if (result.isConfirmed)
        {
          this.loading=true;
          this.api.delete(`Auth/DeleteUser?id=${id}`)
          .subscribe(
            (data) => {
              this.loading=false;
              this.getdat();
              this.messageService.showSuccessAlert(data.message)
            },
            (error) => {
              this.loading=false;
              this.messageService.showErrorAlert(error)
            }
          );

        }
        else
        {


        }
      });

  }


  selectRecord(item:string){
    this.id= item
    this.userForm.get('userId')?.setValue(this.id);
  }

  ngOnInit(): void {
    this.getdat();
    this.initilizaform();
  }


  initilizaform(){
    this.userForm = this.formBuilder.group
    (
      {
           userId   : [this.id],
           status   : [null, [Validators.required]],
      }
    );
  }


  onSubmit()
  {
    Swal.fire({
      html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
      <small class="small-text">Do you want to block  user?</small>`,
      icon: undefined, // Disable the default icon
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No!',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button',
        cancelButton:'swal2-custom-button1'
      },
      width: '300px'
    }).then((result) =>
    {
      if (result.isConfirmed)
         {
            this.loading   = true;
            this.userForm.patchValue({
              status:"Block"
            })
            const formData = this.userForm.value;
            this.api.update("Auth/UpdateStatus",formData).subscribe(
            (response) =>
            {
              this.loading=false
              this.getdat();
              this.messageService.showSuccessAlert(response.message)
            },
            ( error) => {
              this.loading=false

            });

      }
      else
      {
        this.loading   = true;
        this.userForm.patchValue({
          status:"Active"
        })
        const formData = this.userForm.value;
        this.api.update("Auth/UpdateStatus",formData).subscribe(
        (response) =>
        {
          this.loading=false
          this.getdat();
          this.messageService.showSuccessAlert(response.message)
        },
        ( error) => {
          this.loading=false

        });

      }
    });
    if (this.userForm.valid) {
      this.loading=true;
      const formData = this.userForm.value;
      this.api.update("Auth/UpdateStatus",formData).subscribe(
        (response) =>
        {
          this.loading=false
          this.getdat();
          this.messageService.showSuccessAlert(response.message)
        },
        ( error) => {
          this.loading=false

        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { SignalGroup } from '../Models/Authentication/UserModel';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor
  (
    private router:Router
  )
  {

  }

  showSuccessAlert(message: string) {
    Swal.fire({
      html: `<i class="bi bi-check-circle-fill" style="font-size: 2rem !important; color: green !important;"></i> <br>
      <small class="small-text">${message}</small>`,
      icon: undefined, // Disable the default icon
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button'
      },
      width: '300px'
    });
  }

  showErrorAlert(message: string) {
    Swal.fire({

      html: `<i class="bi bi-x-circle-fill" style="font-size: 2rem; color: red !important;"></i>
              <br>
              <small class="small-text">${message}</small>
            `,
      icon: undefined,
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button'
      },
      width: '300px'
    });
  }

  showWarningAlert(message: string) {
    Swal.fire({
      html: `<i class="bi bi-exclamation-triangle-fill" style="font-size: 2rem; color: orange;"></i> <br>
      <small class="small-text">${message}</small>`,
      icon: undefined, // Disable the default icon
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button'
      },
      width: '300px'
    });
  }

  showInfoAlert(message: string) {
    Swal.fire({

      html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
      <small class="small-text">${message}</small>`,
      icon: undefined, // Disable the default icon
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button'
      },
      width: '300px'
    });
  }

  showInfoCustom(icon: any,title:any,count:any) {
    Swal.fire({
      html: `<img src="${icon}" alt="Icon" style="height:40px" /> <br> <br>
             <p>There are totall ${count} cases of ${title}  is Reported in this Area</p>
             `,
      icon: undefined, // Disable the default icon
      showCancelButton: true,
      confirmButtonText: 'Open',
      cancelButtonText: 'No!',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button',
        cancelButton:'swal2-custom-button1'
      },
      width: '300px'
    }).then((result)=>
    {
      if (result.isConfirmed)
        {
           this.router.navigate(['/Chat',title])
        }
        else
        {

        }
    });
}


}

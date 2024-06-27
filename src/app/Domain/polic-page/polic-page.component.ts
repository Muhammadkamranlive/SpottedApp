import { Component } from '@angular/core';

@Component({
  selector: 'app-polic-page',
  templateUrl: './polic-page.component.html',
  styleUrl: './polic-page.component.css'
})
export class PolicPageComponent {
  callNumber(phoneNumber: string): void {
    window.location.href = `tel:${phoneNumber}`;
  }

}

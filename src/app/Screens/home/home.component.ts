import { Component } from '@angular/core';
import {  AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typewriterContainer', { static: true }) typewriterContainer!: ElementRef;
  userRole:string
  constructor(private auth:AuthService)
  {

     this.userRole= this.auth.getRoles().toString()
  }
  ngAfterViewInit() {
    const typewriter = new Typewriter(this.typewriterContainer.nativeElement, {
      loop: true,
      delay: 75,
    });

    typewriter
      .typeString('des piétons à Paris')
      .pauseFor(1200)
      .start();
  }

  isAuthenticated():boolean
  {
      return this.auth.isAuthenticated();
  }

}

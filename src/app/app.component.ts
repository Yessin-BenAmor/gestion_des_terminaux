import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
  

import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    ],
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
     ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [],
})
export class AppModule { }
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,RouterLink,SignInComponent,SignUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'application';
  
}

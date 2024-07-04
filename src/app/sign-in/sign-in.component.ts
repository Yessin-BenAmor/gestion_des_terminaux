import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignUpComponent,RouterOutlet,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}

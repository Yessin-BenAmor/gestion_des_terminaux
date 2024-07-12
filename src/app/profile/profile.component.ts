import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ProfileComponent {
  
  constructor(private authService: AuthService, private router: Router) {}

  signOut() {
    this.router.navigate(['/']); // Navigate to the login page after signing out
    this.authService.signout().subscribe();
  }
  
}

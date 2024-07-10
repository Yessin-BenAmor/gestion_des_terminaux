import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

// Custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  providers: [AuthService], // Add AuthService here
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule], // Add ReactiveFormsModule here
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Correct the typo here
})
export class SignUpComponent {
  submitted = false;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      teamId: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword') // Add the custom validator here
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      alert('Form is invalid. Please fill out all required fields correctly.');
      return;
    }

    const { lastName, name,teamId, password } = this.registerForm.value;

    this.authService.signup(lastName, teamId, name, password).subscribe(
      data => {
        alert('Registration successful!');
        console.log(data);
        this.registerForm.reset();
        this.submitted = false;
      },
      error => {
        alert('Registration failed. Please try again.');
        console.error(error);
      }
    );
  }
}

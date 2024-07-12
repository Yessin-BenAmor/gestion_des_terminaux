import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

{path: '', component: HomeComponent,},
{path : 'signUp', component : SignUpComponent},
{path:'signIn', component : SignInComponent},
{ path: 'profile/:username', component: ProfileComponent,canActivate : [AuthGuard] },


];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { 
    
  }
  
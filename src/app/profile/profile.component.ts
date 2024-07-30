import { Component, OnInit,inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormBuilder, FormGroup,NgModel, Validators } from '@angular/forms';
import { TIDCRUDService } from '../services/tid-crud.service';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
 import { CommonModule } from '@angular/common';
 import {MatDialog} from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
 

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [TIDCRUDService],
  imports : [ReactiveFormsModule,CommonModule,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})



export class ProfileComponent implements OnInit {
  tidForm: FormGroup; // Define FormGroup for form controls
  portfolioItems: any[] = []; 
  tidData: any;
  id : any ; 
  ID : any ;
  button = "submit";
  id_tid1 = 0 ; 
  header = "Add a new TID";
   constructor(public dialog:MatDialog,private _snackBar: MatSnackBar,private fb: FormBuilder, private authService: AuthService, private router: Router, private tidService : TIDCRUDService) {
     this.tidForm = this.fb.group({
      TID: ["",  Validators.required],
      sponsor: ["", Validators.required],
      GEM_Test: [false],
      GEM_Auto: [false],
      GEM_UT4DEV: [false],
      Terminal_type: ["", Validators.required],
      DCC_Test: [false], 
      UPI_Test: [false] ,  

      DCC_Auto: [false],  
      UPI_Auto: [false],   

      DCC_UT4DEV: [false],  
      UPI_UT4DEV: [false] , 
    });
  }



  ngOnInit(): void {
   const id = this.getID();
     if (id) {
      this.getTID(id);
    }  }

  
    username = localStorage.getItem('usernameValuemlsignin');


    //open dialog TO DELETE 
    openDialog(id : any, ID : any) {
      const dialogRef = this.dialog.open(DialogExampleComponent);
  
      dialogRef.afterClosed().subscribe(result => {
         if (result === true ) {
          this.deleteTID(id,ID);
        }
      });
    }




  createTID() {
    const formData = this.tidForm.value;
    console.log('Form submitted:', formData);
    this.tidService.createTID(formData).subscribe(
      (data: any) => {
        console.log('Create TID successful:', data);
        this.portfolioItems.push(data);
      },
      (error: any) => {
        console.error('Create TID error:', error);
      }
    );
  }




  //get item 
  getTID(id : any) {
    this.tidService.getTID(id).subscribe(
      (data: any) => {
        console.log('Get TID successful:', data);
        this.tidData = data; // Stocker 
        this.portfolioItems = data;
        console.log('portfolioItems:', this.portfolioItems);
      },
      (error: any) => {
        console.error('Get TID error:', error);
      } )
  }   



//get id of the user 
  getID():  string | null {
     return this.authService.getID();}



  //delete tid
    deleteTID(id_tid: any, id: any) {
      this.tidService.deleteTID(id_tid, id).subscribe(
        (data: any) => {

          this._snackBar.open("TID deleted", "OK",{duration: 5000});
          console.log('Delete TID successful:', data);
          this.getTID(id);
        },
        (error: any) => {
           console.error('Delete TID error:', error);
           
        }
      );
    }
    

//passTID TID
passTID(id_tid: any) {
  const id_tid1 = id_tid;
     const item = this.portfolioItems.find(item => item.id_tid === id_tid);

           this.tidForm.setValue({
      TID: item.TID,
      sponsor: item.sponsor,
      GEM_Test: item.GEM_Test,
      GEM_Auto: item.GEM_Auto,
      GEM_UT4DEV: item.GEM_UT4DEV,
      Terminal_type: item.Terminal_type,
      DCC_Test: item.DCC_Test, 
      UPI_Test: item.UPI_Test , 
      DCC_Auto: item.DCC_Auto, 
      UPI_Auto: item.UPI_Auto,  
      DCC_UT4DEV: item.DCC_UT4DEV, 
      UPI_UT4DEV: item.UPI_UT4DEV , 

      });
      this.button = "update";
      this.header = "Update TID" ; 
      this.id_tid1 = item.id_tid;  

      window.scrollTo(0, 0);

    }
  

 


//onSubmit button

  onSubmit() {
    if (this.tidForm.valid && this.button === "update") {
        const formData = this.tidForm.value;
      console.log('Form submitted:', formData);
      this.tidService.updateTID(this.id_tid1,formData).subscribe(
        (data: any) => {
          console.log('Update TID successful:', data);
          this._snackBar.open("TID updated", "OK",{duration: 5000});
          this.getTID(this.getID());
          this.tidForm.reset(); 
          this.button = "submit" ; 
          this.header = "Add a new TID";
          window.scroll({
            top: document.body.scrollHeight,
            behavior: 'smooth' 
          });        },
        (error: any) => {
          console.error('Update TID error:', error);
        }
      );
    } 

    if (this.tidForm.valid && this.button === "submit") {
      
    const formData = this.tidForm.value;
    const id = localStorage.getItem("id") ; 
    formData.id = localStorage.getItem("id") ; 
    console.log('Form submitted:', formData);
    console.log('portfolioItems:', this.portfolioItems);
    this.tidService.createTID(formData).subscribe(
    
      (data: any) => {
        console.log('Create TID successful:', data);
        this._snackBar.open("TDI created", "OK",{duration: 5000});
        this.getTID(id);
        this.tidForm.reset(); 


        
      } ,
      (error: any) => {
        console.error('Create TID error:', error);
        alert("Error creating TID, please try again");
      }
    );
    }
    if (!this.tidForm.valid) {
      alert("Please fill all the fields");
       
    }
  }

  signOut() {
    window.location.href = '/';
    this.authService.signout().subscribe(() => {
    });
  }
}

 

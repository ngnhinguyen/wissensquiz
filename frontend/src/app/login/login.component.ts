import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private bs: BackendService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) { //valid nötig, damit Formular nicht leer ist (alles ausgefüllt) oder falsche EIngabe
      this.bs.login(this.loginForm.value.email, this.loginForm.value.password) //login Methode aus BackendService wird aufgerufen
        .then(()=>{ this.router.navigate(['/table'])
        });
    }
  }
}

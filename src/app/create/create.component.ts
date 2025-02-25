import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Member } from '../shared/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private bs = inject(BackendService)
  private router = inject(Router)
  member: Member = { _id: '', forename: '', surname: '', email: '' };
  saved: boolean = false

  form = new FormGroup({
    firstnameControl : new FormControl<string>('', [Validators.required]),
    surnameControl: new FormControl<string>('', [Validators.required]),
    emailControl: new FormControl<string>('', [Validators.required])
  });

  create(): void {
    const values = this.form.value;
    console.log('values : ', values)
    this.member.forename = values.firstnameControl || '';
    this.member.surname = values.surnameControl || '';
    this.member.email = values.emailControl || '';
    console.log('new member : ', this.member)

    if(this.member.forename!='' && this.member.surname!='' && this.member.email!='') {
      this.bs.create(this.member)
      .then( () => this.saved = true )
    }
  }

  confirm(): void {
    this.router.navigate(['/table'])
  }

  cancel(): void {

  }
}
import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Member } from '../shared/member';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent  implements OnInit{

  private bs = inject(BackendService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  member!: Member;
  id: string | null = ''
  form = new FormGroup({
    firstnameControl : new FormControl<string>(''),
    lastnameControl: new FormControl<string>(''),
    emailControl: new FormControl<string>('')
});

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)
    this.bs.getOne(this.id!)
    .then( response => {
      this.member = response 
      this.form.patchValue({
        firstnameControl: this.member?.forename,
        lastnameControl: this.member?.surname,
        emailControl: this.member?.email
      })
      return this.member
    })
    .then( member => console.log('member in DetailComponent : ', member ))   
  }

  update(): void {
    const values = this.form.value;
    this.member.forename = values.firstnameControl!;
    this.member.surname = values.lastnameControl!;
    this.member.email = values.emailControl!;

    this.bs.update(this.id!, this.member)
    .then( () => this.router.navigate(['/table']))
  }


  cancel(): void {
    this.router.navigate(['/table']);
  }

}
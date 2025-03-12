import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Member } from '../../../../backend/member';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

//Methoden, um in detail Mitglieder anzeigen zu lassen im Frontend
export class DetailComponent implements OnInit {

  private bs = inject(BackendService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  member!: Member;
  id: string | null = ''
  form = new FormGroup({
    firstnameControl: new FormControl<string>(''),
    lastnameControl: new FormControl<string>(''),
    emailControl: new FormControl<string>('')
  });

  ngOnInit(): void {
    //Beispiel: http://localhost:4200/member/1 , ID ist 1 
    this.id = this.route.snapshot.paramMap.get('id'); //ID aus URL lesen
    console.log('id = ', this.id)
    
    //APi anfrage
    this.bs.getOne(this.id!) //getOne() Methode aus backendservice.ts (bs), Mitglied mit jeweiliger ID abrufen aus Backend
    //API Antwort ist da? Dann speichern als member Object
      .then(response => {
        this.member = response //Antwort speichern als member 
        this.form.patchValue({ //Formular mit Werten (Forename, surname, email) füllen der Mitgliedsdaten
          firstnameControl: this.member?.forename,
          lastnameControl: this.member?.surname,
          emailControl: this.member?.email
        })
        return this.member
      })
      .then(member => console.log('member in DetailComponent : ', member)) //Debugging in Konsole, oder in Angular http://localhost:4200/detail/67c48f4532834782f6cc7200 = Eugene Williams
  }

  //Methode, um Mitglied zu updaten und jeweilige Felder mit neuen Werten füllen
  update(): void {
    const values = this.form.value;
    this.member.forename = values.firstnameControl!;
    this.member.surname = values.lastnameControl!;
    this.member.email = values.emailControl!;
    this.bs.update(this.id!, this.member)
      .then(() => this.router.navigate(['/table']))
  }
}
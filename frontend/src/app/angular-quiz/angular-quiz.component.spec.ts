import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularQuizComponent } from './angular-quiz.component';

describe('AngularQuizComponent', () => {
  let component: AngularQuizComponent;
  let fixture: ComponentFixture<AngularQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

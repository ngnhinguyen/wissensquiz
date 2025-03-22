import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendQuizComponent } from './backend-quiz.component';

describe('BackendQuizComponent', () => {
  let component: BackendQuizComponent;
  let fixture: ComponentFixture<BackendQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

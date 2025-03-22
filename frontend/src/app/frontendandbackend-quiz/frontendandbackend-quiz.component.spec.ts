import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendandbackendQuizComponent } from './frontendandbackend-quiz.component';

describe('FrontendandbackendQuizComponent', () => {
  let component: FrontendandbackendQuizComponent;
  let fixture: ComponentFixture<FrontendandbackendQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendandbackendQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendandbackendQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

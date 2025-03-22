import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptQuizComponent } from './javascript-quiz.component';

describe('JavascriptQuizComponent', () => {
  let component: JavascriptQuizComponent;
  let fixture: ComponentFixture<JavascriptQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

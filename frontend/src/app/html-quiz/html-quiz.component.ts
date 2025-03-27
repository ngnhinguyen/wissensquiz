import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-html-quiz',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './html-quiz.component.html',
  styleUrl: './html-quiz.component.css'
})
export class HtmlQuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  totalQuestions = 0;
  selectedAnswer: string | null = null;
  correctAnswers = 0;
  progress: number = 0;
  timeLeft: number = 10;
  timer: any;
  totalTime: number = 0;
  quizCompleted: boolean = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getQuestionsByCategory('HTML') // wenn seite öffnet, holt sich das Quiz die Fragen aus dem Backend, also datenbank

      .then(response => {
        this.questions = response;
        this.totalQuestions = this.questions.length;
        this.startTimer();
      })
      .catch(error => console.error('Error loading HTML questions:', error));
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;// wenn die Zeit noch nicht abgelaufen ist, wird die Zeit um 1s reduziert
      } else {
        clearInterval(this.timer);// wenn die Zeit abgelaufen ist, wird der Timer gestoppt
        this.nextQuestion(); // wenn die Zeit abgelaufen ist, wird die nächste Frage aufgerufen
      }
    }, 1000); // 1000ms = 1s
  }

  //Methode, um Antwort zu speichern
  //wenn Antwort ausgewählt wird, wird die Antwort gespeichert
  //wenn noch keine Antwort ausgewählt wurde, wird die Antwort gespeichert
  //wenn die ausgewählte Antwort die richtige Antwort ist, wird die Anzahl der korrekten Antworten erhöht
  selectAnswer(option: string) {// wenn eine Antwort ausgewählt wird, wird die Antwort gespeichert
    if (!this.selectedAnswer) { // wenn noch keine Antwort ausgewählt wurde
      this.selectedAnswer = option;// wird die Antwort gespeichert
      if (option === this.questions[this.currentQuestionIndex]?.correctAnswer) { // wenn die ausgewählte Antwort die richtige Antwort ist
        this.correctAnswers++;
      }
      clearInterval(this.timer); // Timer wird gestoppt
    }
  }

  //Letzte Frage → nextQuestion() → Quiz beendet quizCompleted = true
  //*ngIf="!quizCompleted" ist jetzt false
  //else quizEnd wird aktiv
  //ng-template wird gerendert
  nextQuestion() {
    this.totalTime += 10 - this.timeLeft; // die verbleibende Zeit wird zur Gesamtzeit hinzugefügt
    if (this.currentQuestionIndex < this.totalQuestions - 1) { // wenn es noch Fragen gibt
      this.currentQuestionIndex++; // wird die nächste Frage aufgerufen
      this.selectedAnswer = null;// die ausgewählte Antwort wird zurückgesetzt
      this.progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100; // der Fortschritt wird berechnet, indem die Anzahl der beantworteten Fragen durch die Gesamtanzahl der Fragen geteilt und mit 100 multipliziert wird
      this.timeLeft = 10;
      this.startTimer(); // der Timer wird gestartet
    } else {
      //ng Template quizCompleted wird hier auf true gesetzt, damit wird das Quiz ausgeblendet und der ng-template (quizEnd) aktiviert (= gerendert)
      this.quizCompleted = true; // wenn es keine Fragen mehr gibt, wird das Quiz beendet
    }
  }

  restartQuiz() { // das Quiz wird zurückgesetzt
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.progress = 0;
    this.totalTime = 0;
    this.quizCompleted = false;
    this.selectedAnswer = null;
    this.timeLeft = 10;
    this.startTimer();
  }
}

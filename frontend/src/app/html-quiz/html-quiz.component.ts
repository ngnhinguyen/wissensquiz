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
    this.backendService.getQuestionsByCategory('HTML')
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
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.nextQuestion();
      }
    }, 1000);
  }

  selectAnswer(option: string) {
    if (!this.selectedAnswer) {
      this.selectedAnswer = option;
      if (option === this.questions[this.currentQuestionIndex]?.correctAnswer) {
        this.correctAnswers++;
      }
      clearInterval(this.timer);
    }
  }

  nextQuestion() {
    this.totalTime += 10 - this.timeLeft;
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
      this.timeLeft = 10;
      this.startTimer();
    } else {
      this.quizCompleted = true;
    }
  }

  restartQuiz() {
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

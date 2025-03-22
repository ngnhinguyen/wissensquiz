import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { CssQuizComponent } from './css-quiz/css-quiz.component';
import { HtmlQuizComponent } from './html-quiz/html-quiz.component';
import { JavascriptQuizComponent } from './javascript-quiz/javascript-quiz.component';
import { AngularQuizComponent } from './angular-quiz/angular-quiz.component';
import { BackendQuizComponent} from './backend-quiz/backend-quiz.component';
import { FrontendandbackendQuizComponent } from './frontendandbackend-quiz/frontendandbackend-quiz.component';


export const routes: Routes = [{
  path: "",
  component: HomeComponent,
  pathMatch: 'full'
},
{
  path: "table",
  component: TableComponent
},
{
  path: "create",
  component: CreateComponent
},
{
  path: "member/:id",
  component: DetailComponent
},
{ path: "login", component: LoginComponent },
{ path: "quiz", component: QuizComponent },
{ path: "css-quiz", component: CssQuizComponent},
{ path: "html-quiz", component: HtmlQuizComponent},
{path: "javascript-quiz", component: JavascriptQuizComponent},
{path: "angular-quiz", component: AngularQuizComponent},
{path: "backend-quiz", component: BackendQuizComponent},
{path: "frontendandbackend-quiz", component: FrontendandbackendQuizComponent},

{ path: "**", redirectTo: "" },];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { CssQuizComponent } from './css-quiz/css-quiz.component';
import { HtmlQuizComponent } from './html-quiz/html-quiz.component';


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

{ path: "**", redirectTo: "" },];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';

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
  { path: "**", redirectTo: "" },
  {
    path: "member/:id",
    component: DetailComponent
  }];
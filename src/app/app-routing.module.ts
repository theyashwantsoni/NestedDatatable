import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatatableComponent } from './datatable/datatable.component';

const routes: Routes = [
  { path:'',redirectTo:'main',pathMatch:"full"},
  { path:'main',component:DatatableComponent},
  { path:'**',redirectTo:'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

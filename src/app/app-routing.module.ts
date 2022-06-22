import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiaEstiloComponent } from './views/guia-estilo/guia-estilo.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path:"login"
  },
  {
    component: GuiaEstiloComponent,
    path:"guia-estilo"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

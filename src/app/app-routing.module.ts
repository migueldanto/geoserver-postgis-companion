import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyAuthenticatedUsersGuard } from './guards/only-authenticated-users.guard';
import { OnlyUnauthenticatedUsersGuard } from './guards/only-unauthenticated-users.guard';
import { GuiaEstiloComponent } from './views/guia-estilo/guia-estilo.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path:"login",
    canActivate:[OnlyUnauthenticatedUsersGuard]
  },
  {
    component: GuiaEstiloComponent,
    path:"guia-estilo"
  },
  {
    component: HomeComponent,
    path: '',
    canActivate: [OnlyAuthenticatedUsersGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

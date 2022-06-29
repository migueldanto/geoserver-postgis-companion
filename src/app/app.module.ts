import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { GuiaEstiloComponent } from './views/guia-estilo/guia-estilo.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GuiaEstiloComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

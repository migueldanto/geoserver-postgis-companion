import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { TokenPair } from 'src/app/types/jwt/token-pair';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'view-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mensaje:string=""
  mensajeClass:string="default"

  constructor(
    private http:HttpClient,private sessionService:SessionService,
    private router: Router
    ) {

  }

  ngOnInit(): void {
  }

  solicitarSesion(f:NgForm): void{
    console.log(f.value,f.valid)
    if(f.valid){
      this.http.post<TokenPair>('http://127.0.0.1:8000/api/token/',f.value)
      .subscribe(tokenPair=>{
        this.mensaje = "Entrando..."
        this.mensajeClass = "success"
        this.sessionService.saveTokensInLocalStorage(tokenPair)
        this.router.navigate(['/']);
      },error=>{
        this.mensaje = "Clave de usuario o contraseña incorrectos"
        this.mensajeClass="error"
        console.log(error)
      })
      
    }
    
  }

}



interface UserBasicInfo{
  username:string,
  email:string,
  first_name:string,
  last_name:string,
  is_superuser:boolean,
  pk:number
}
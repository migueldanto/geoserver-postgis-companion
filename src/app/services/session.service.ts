import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenPair } from 'src/app/types/jwt/token-pair';
import { TokenVerify } from '../types/jwt/token-verify';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionExists: BehaviorSubject<boolean>;
  public tokens?: TokenPair;
  private timerRefreshId:number= 0


  constructor(private http: HttpClient) {
    this.sessionExists = new BehaviorSubject(false)
  }

  getSessionExists():Observable<boolean>{
    return this.sessionExists.asObservable()
  }

  isSessionExists():boolean{
    return this.sessionExists.getValue()
  }

  reviewSessionInLocalStorage(): void {
    const tokens: string | null = localStorage.getItem("tokens")
    
    if (tokens === null) {
      this.sessionExists.next( false )
      return
    }
    //verificar si el token aun es vigente, mientras pensaremos que si hay session
    this.tokens = <TokenPair>JSON.parse(tokens)
    this.sessionExists.next(true);
    this.reviewValidity()
  }

  reviewValidity(): void {
    this.http.post<TokenVerify>('http://127.0.0.1:8000/api/token/verify/', { token: this.tokens?.access })
      .subscribe((respuesta) => {
        this.sessionExists.next(true);
        this.nextTokenRefresh()
      }, error => {
        console.log("HEY, aqui se podria revisar, si el refresh token sirve aun, y si sirve traer otro token acces")
        this.logout()
      })
  }

  saveTokensInLocalStorage(tokens?: TokenPair): void {
    
    if (tokens!==undefined) {
      console.log("salvando tokens" , tokens)  
      this.tokens= tokens
      this.sessionExists.next(true);
      localStorage.setItem("tokens", JSON.stringify(tokens)) 
      localStorage.setItem("tokensCreatedAt", Date.now()+"" )
      this.nextTokenRefresh()
      return 
    }
    localStorage.removeItem("tokens")
    localStorage.removeItem("tokensCreatedAt")
    
  }

  logout(){
    this.sessionExists.next( false )
    this.tokens = undefined
    this.saveTokensInLocalStorage(undefined)
  }

  /**
   * Cada 5 mins caducan los tokens, asi que podria redrescarse a los 4:30 mins
   */
  nextTokenRefresh(){
    const date_text:string|null = localStorage.getItem("tokensCreatedAt")
    if(date_text===null || this.tokens === undefined){
      return
    }
    const date_int = parseInt(date_text) + (4.5 * 60 * 1000)
    const ahora = new Date()

    const faltanteParaCaducar = date_int - ahora.getTime();

    console.log("faltan",faltanteParaCaducar)
    console.log("a las ", (new Date(date_int)))

    this.timerRefreshId = window.setTimeout(()=>{
      //alert("sesion, por caducar, mandar una peticion de refresh del token ahora")
      console.log("mandando una peticion de refresh del token ahora")
      let copyTokens:TokenPair =<TokenPair>{...this.tokens}
      this.http.post<TokenPair>('http://127.0.0.1:8000/api/token/refresh/',{"refresh":this.tokens?.refresh}).subscribe(newAccess=>{
        copyTokens.access = newAccess.access
        this.saveTokensInLocalStorage(copyTokens)
      },error=>{
        this.logout()
      })
    },faltanteParaCaducar)


  }

  public clearAllTimeOuts():void{
    window.clearTimeout(this.timerRefreshId)
  }
}

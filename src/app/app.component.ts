import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {

  public sessionExists:boolean = false

  constructor(
    protected sessionService:SessionService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getSessionExists()
    this.sessionService.reviewSessionInLocalStorage();
    
  }

  ngOnDestroy(): void {
    this.sessionService.clearAllTimeOuts()
  }

  getSessionExists(){
    this.sessionService.getSessionExists().subscribe(exists=>{
      this.sessionExists = exists;
    })
  }
  logout(){
    this.sessionService.logout()
    this.router.navigate(['/login']);
  }


}

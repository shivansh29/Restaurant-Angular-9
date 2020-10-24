import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthAction from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project';

  constructor(private store : Store<fromApp.AppState>){}
 ngOnInit(){
  //this.authServ.autoLogin();
  this.store.dispatch( new AuthAction.AutoLogin());
 }

}

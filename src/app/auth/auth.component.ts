import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from './store/auth.action';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private route: Router, 
              private componentFactResolve: ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }

  isLoginMode = false;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective,{ static: false }) alertHost: PlaceholderDirective;

  private subs: Subscription;
  private storeSub: Subscription;

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid)
    return ;
    let email = form.value.email;
    let password =  form.value.password;

   // let authObserv: Observable<AuthResponseData>;

    if(this.isLoginMode){
      //authObserv=  this.authService.login(email,password);
      this.store.dispatch( new AuthAction.LoginStart({email: email, password: password}));
    }
    else{
     // authObserv= this.authService.signUp(email,password);
     this.store.dispatch( new AuthAction.SignUpStart({email: email, password: password}));
    }

   /* authObserv.subscribe(
      response =>{
        this.route.navigate(['/recipies'])
        console.log(response);
        this.isLoading=false;
      },
      errorRes =>{
        console.log(errorRes);
        this.error = errorRes;
       // this.showErrorProgramtically(errorRes);
        this.isLoading=false;
      }
    );*/
  
    form.reset();
  }

  ngOnInit(){
    this.storeSub = this.store.select('auth').subscribe( authState =>{
      this.isLoading = authState.loading;
      this.error = authState.errorMsg;
      
    });
  }

  ngOnDestroy(){
    if(this.subs)
    this.subs.unsubscribe();
    if(this.storeSub)
    this.storeSub.unsubscribe();
  }

  OnHandle(){
    this.store.dispatch( new AuthAction.ClearError());
  }
  
  /*showErrorProgramtically(message: string){
    let AlertCmoFact = this.componentFactResolve.resolveComponentFactory(AlertComponent);
    let viewContainerRef = this.alertHost.viewRef;
    viewContainerRef.clear();

    let alertView = viewContainerRef.createComponent(AlertCmoFact);
    alertView.instance.message = message;
    this.subs = alertView.instance.close.subscribe( ()=>{
      this.subs.unsubscribe();
      viewContainerRef.clear();
    } );
  }*/
}

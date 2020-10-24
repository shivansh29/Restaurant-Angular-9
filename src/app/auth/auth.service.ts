import { Router } from '@angular/router';
import { UserData } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.action';
import { Store } from '@ngrx/store';


export interface AuthResponseData{
    kind: string;
    idToken: string;
    email : string;
    refreshToken : string;
    expiresIn:  string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    ExpiryTime : any;

   // user = new BehaviorSubject<UserData>(null);
    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>){}
/*
    signUp(email: string,password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken : true
        }
        ).pipe( catchError(this.handleError), tap( resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }
        ) )
        ;
    }


    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken : true
        }
        ).pipe(catchError(this.handleError), tap( resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }))
        ;
    }

    private handleError(errorRes: HttpErrorResponse){
        let error='something occured';

        if(!errorRes.error || !errorRes.error.error)
        return  throwError(error); 

        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            error = 'Email Already Exists';
            break;
            case 'EMAIL_NOT_FOUND':
                error='Email not found';
                break;
            case 'INVALID_PASSWORD':
                error = 'Invalid password';
                break;
          }

          return throwError(error);
    
    }

    private handleAuthentication(email: string,localId: string,token: string, expirationTime: number){
        let expirationtime = new Date(new Date().getTime() + expirationTime * 1000);
        let user = new UserData(email,localId,token,expirationtime)
        //this.user.next( user);
        this.store.dispatch(new AuthAction.AuthenticateSuccess({
            email: email,
            id: localId,
            token: token,
            tokenExpirationDate: expirationtime
        }));   
        this.autoLogout(expirationTime * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }


    logout(){
        //this.user.next(null);
        this.store.dispatch( new AuthAction.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.ExpiryTime){
            clearTimeout(this.ExpiryTime);
        }

        this.ExpiryTime =  null;
    }

    autoLogin(){
        let user: {
            email:string, 
            id:string, 
            _token:string,
            _tokenExpirationDate:string
        } =  JSON.parse(localStorage.getItem('userData'));
        if(!user)
        return ;

        const loadedUser = new UserData(user.email,user.id,user._token, new Date(user._tokenExpirationDate));

        if(loadedUser.token){
            //this.user.next(loadedUser);
            this.store.dispatch(new AuthAction.AuthenticateSuccess({
                email: loadedUser.email,
                id: loadedUser.id,
                token: loadedUser.token,
                tokenExpirationDate: new Date(user._tokenExpirationDate)
            }))
            let exp = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(exp);
        }

    }*/


    autoLogout(expirationTime: number){
        this.ExpiryTime = setTimeout( ()=>{
            this.store.dispatch( new AuthAction.Logout());

        }, expirationTime)
    }

    clearLogout(){
        if(this.ExpiryTime){
            clearTimeout( this.ExpiryTime);
            this.ExpiryTime = null;
        }

    }

}


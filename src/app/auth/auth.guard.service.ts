import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

    constructor(private authServ: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

    canActivate(router : ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Promise<boolean> | Observable<boolean | UrlTree>
    {
        return this.store.select('auth').pipe( take(1), map( stateData => stateData.user),map( user =>{
            let temp = !!user;
            if(temp)
            return true;
            return this.router.createUrlTree(['/auth']);
        }));
    }
}
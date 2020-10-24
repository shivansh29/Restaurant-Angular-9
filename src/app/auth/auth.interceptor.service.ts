import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap, map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private authServ: AuthService, private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.store.select('auth').pipe( take(1), map( stateData => stateData.user) , exhaustMap( user =>{
            if(!user)
            return next.handle(req);
            const modified = req.clone( {
                params: new HttpParams().set('auth',user.token)
            });
            return next.handle(modified);
        }));
        
    }
}
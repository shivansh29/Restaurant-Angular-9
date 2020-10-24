import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthAction from '../auth/store/auth.action';
import * as recipActions from'../recipies/store/recipie.action';

@Component({
selector: 'app-header',
templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    constructor( private store: Store<fromApp.AppState>){}

    isAuthenticated = false;
    subs: Subscription;
    saveData(){
       // this.dataService.storeData();
       this.store.dispatch( new recipActions.StoreRecipie());
    }

    fetchData(){
        //this.dataService.fetchData().subscribe();
        this.store.dispatch( new recipActions.FetchValue());
    }

    Logout(){
       // this.authServ.logout();
       this.store.dispatch( new AuthAction.Logout());
    }

    ngOnInit(){
        this.subs = this.store.select('auth').pipe( map (stateData => stateData.user)).subscribe( response =>{
            this.isAuthenticated= !!response;
            console.log(!response);
            console.log(!!response);
        });
    }

    ngOnDestroy(){
        this.subs.unsubscribe();
    }
}
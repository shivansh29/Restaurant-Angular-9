import { take , map, switchMap} from 'rxjs/operators';
import { Recipie } from './../recipie.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as recipAction from '../store/recipie.action';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ResolverService implements Resolve<Recipie[]>{

    constructor(  private action$: Actions,
                private store: Store<fromApp.AppState>){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       // const temp= this.recipService.getRecipe();
       return this.store.select('recipie').pipe(
        take(1),
        map(recipesState => {
          return recipesState.recipie;
        }),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(new recipAction.FetchValue());
            return this.action$.pipe(
              ofType(recipAction.SET_VALUE),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );
    }

}
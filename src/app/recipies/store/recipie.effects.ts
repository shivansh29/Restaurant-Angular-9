import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map , switchMap, withLatestFrom} from 'rxjs/operators';
import { Recipie } from '../recipie.model';
import  * as recipActions from './recipie.action';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipieEffects  {
    constructor( private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}

    @Effect()
     fetchRecipies = this.actions$.pipe( ofType(recipActions.FETCH_VALUE),
         switchMap( ()=>{
            return this.http.get<Recipie[]>('https://course-project-book.firebaseio.com/recipies.json')
         } ),
         map( recipies =>{
            return recipies.map(
                singleRecipie =>{
                    return {...singleRecipie, ingredients: singleRecipie.ingredients? singleRecipie.ingredients : []};
                }
            );
    } ),
    map( recipItems =>{
        return new recipActions.SetValue(recipItems);
    } )
     )

     @Effect({dispatch : false})
     storeRecipie = this.actions$.pipe( ofType(recipActions.STORE_RECIPIES),
        withLatestFrom(this.store.select('recipie')),
        switchMap(
            ([actionData,recipieState])=>{
                return this.http.put('https://course-project-book.firebaseio.com/recipies.json',
                recipieState.recipie
                )
            }
        )
     )
}
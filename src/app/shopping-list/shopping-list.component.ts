import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShopListActions from './store/shop-list.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  subscription: Subscription;
  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients=this.store.select('shopList');
    /*this.ingredients= this.shopService.getList();
    this.subscription=this.shopService.ingredientChanged.subscribe(
      (ingrd: Ingredient[])=>{
        this.ingredients=ingrd;
      }
    )*/
  }

  ngOnDestroy(){
   // this.subscription.unsubscribe();
  }

  StartEdit(index: number){
    //this.shopService.startEditing.next(index);
    this.store.dispatch(new ShopListActions.StartEdit(index));
  }

}

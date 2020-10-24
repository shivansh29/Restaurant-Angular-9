import { Recipie } from './../recipie.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipActions from '../store/recipie.action';
import { map, switchMap } from 'rxjs/operators';
import * as ShopListActions from '../../shopping-list/store/shop-list.action';

@Component({
  selector: 'app-recipies-details',
  templateUrl: './recipies-details.component.html',
  styleUrls: ['./recipies-details.component.css']
})
export class RecipiesDetailsComponent implements OnInit {

   RecipiesItems: Recipie;
    id: number;
  constructor( private activeRoute: ActivatedRoute,
                private route: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.activeRoute.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipie');
      }),
      map(recipesState => {
        return recipesState.recipie.find((recipe, index) => {
          return index === this.id;
        });
      })
    )
    .subscribe(recipe => {
      this.RecipiesItems = recipe;
      console.log(this.RecipiesItems);
    });
  }

  OnClicking(){
    this.route.navigate(['edit'],{relativeTo: this.activeRoute});
   // this.route.navigate(['../', this.id,'edit'], {relativeTo: this.activeRoute});
  }

  ToShoppingList(recip: Recipie){
    //this.recipService.addIngredients(recip.ingredients);
    this.store.dispatch( new ShopListActions.AddIngredients(recip.ingredients))
  }

  Delete(){
    //this.recipService.deleteRecipie(this.id);
    this.store.dispatch( new RecipActions.DeleteRecipie(this.id));
    this.route.navigate(['/recipies'])
  }

}

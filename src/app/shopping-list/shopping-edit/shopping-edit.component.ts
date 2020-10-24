import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store} from '@ngrx/store';
import * as ShopListActions from '../store/shop-list.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') signForm: NgForm;

  subscrip: Subscription;
  editMode= false;
  editItemIndex: number;
  editIngredient: Ingredient;
  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscrip=this.store.select('shopList').subscribe( stateData =>{
      if(stateData.index > -1){
        this.editMode=true;
        this.editIngredient = stateData.singleIngred;
        this.signForm.setValue({
          'name': this.editIngredient.Name,
          'amount': this.editIngredient.amount
        })
      }
      else
      this.editMode=false;
    });
  }

  clearForm(){
    this.signForm.reset();
    this.editMode=false;
    this.store.dispatch(new ShopListActions.StopEdit());
  }

  onDelete(){
    //this.shopService.deleteIngredient(this.editItemIndex);
    this.store.dispatch( new ShopListActions.DeleteIngredient());
    this.clearForm();
  }

  ToAdd(form: NgForm){
    const value=form.value;
    let ingred= new Ingredient(value.name ,value.amount);
    console.log(value.name+"   "+value.amount+"   "+ingred.Name);
    if(this.editMode)
    //this.shopService.updateIngredient(this.editItemIndex,ingred);
    this.store.dispatch(
      new ShopListActions.UpdateIngredient( ingred))
    else
    this.store.dispatch(new ShopListActions.AddIngredient(ingred));
    this.editMode=false;
    this.signForm.reset();
  }

  ngOnDestroy(){
    this.subscrip.unsubscribe();
    this.store.dispatch( new ShopListActions.StopEdit());
  }
}

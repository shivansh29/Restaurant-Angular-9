import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Recipie } from './../recipie.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as RecipAction from '../store/recipie.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit, OnDestroy {

  id: number;
  edit: boolean = false;
  recipForm: FormGroup;
  private storeSub: Subscription;
  constructor(private route: ActivatedRoute,  
                private routing: Router, private Store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) =>{
        this.id= +param['id'];
        this.edit= param['id'] != null;
        this.initForm();
        console.log(this.edit);
      }
    )
  }

  ngOnDestroy(){
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  private initForm(){
    let recipName = '';
    let description = '';
    let imagePath ='';
    let ingredients = new FormArray([]);

    if(this.edit){
      //const temp=this.recipService.getRecipeId(this.id);
      this.storeSub=this.Store.select('recipie').pipe(
        map( recipieStata =>{
          return recipieStata.recipie.find( (recip,index) =>{
            return index === this.id;
          } )
        })
      ).subscribe(
        temp =>{
      recipName = temp.name;
      description= temp.description;
      imagePath = temp.imagePath;
      console.log(temp['name']);
      if(temp['ingredients']){
        for(let ingred of temp.ingredients){
          ingredients.push(
            new FormGroup({
              'Name': new FormControl(ingred.Name,Validators.required),
              'amount': new FormControl(ingred.amount , [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
      }
      )
      
    }

    this.recipForm = new FormGroup({
      'name': new FormControl(recipName,Validators.required),
      'description': new FormControl(description,Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'ingredients': ingredients
    });
  }

  getControls(){
    console.log("controls");
    console.log((<FormArray>this.recipForm.get('ingredients')).controls);
    return (<FormArray>this.recipForm.get('ingredients')).controls;
  }

  Onsubmit(){
    if(this.edit)
    //this.recipService.updateRecipie(this.id,this.recipForm.value);
    this.Store.dispatch( new RecipAction.UpdateRecipie({index: this.id, newRecipie: this.recipForm.value}))
    else
    //this.recipService.addrecipie(this.recipForm.value);
    this.Store.dispatch( new RecipAction.AddRecipie(this.recipForm.value));
  //  console.log(this.recipForm);
  this.OnRemove();
  }

  AddIngredient(){
    (<FormArray>this.recipForm.get('ingredients')).push(
      new FormGroup({
        'Name': new FormControl(null,Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  OnRemove(){
    this.routing.navigate(['../'],{relativeTo: this.route});
  }

  DeleteIngredient(index: number){
    (<FormArray>this.recipForm.get('ingredients')).removeAt(index);
  }
}

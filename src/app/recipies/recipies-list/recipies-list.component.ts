import { map } from 'rxjs/operators';
import { Recipie } from './../recipie.model';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipies-list',
  templateUrl: './recipies-list.component.html',
  styleUrls: ['./recipies-list.component.css']
})
export class RecipiesListComponent implements OnInit, OnDestroy {
  recipies: Recipie[] = [];
  constructor(private route: Router,
              private activeRoute: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  subscription: Subscription;

  ngOnInit() {
    this.store.select('recipie').pipe( map( recip => recip.recipie) ).subscribe( 
      (recip: Recipie[])=>{
      this.recipies=recip;
    });
    /*this.subscription=this.recipServ.recipChanged.subscribe(
      (recip: Recipie[])=>{
        this.recipies=recip;
       // console.log("inside recipie list");
        //console.log(this.recipies);
      }
    )*/
    //this.recipies=this.recipServ.getRecipe();
    
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  onClick(){
    this.route.navigate(['new'], {relativeTo: this.activeRoute});
  }

}

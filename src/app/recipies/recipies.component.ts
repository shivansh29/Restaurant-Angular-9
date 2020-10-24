import { Recipie } from './recipie.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {

   Detail: Recipie;
  constructor() { }

  ngOnInit() {
    
  }

  ListItem(event){
    this.Detail = event;
    console.log(this.Detail);
  }

}

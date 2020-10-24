import { Recipie } from './../../recipie.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipies-item',
  templateUrl: './recipies-item.component.html',
  styleUrls: ['./recipies-item.component.css']
})
export class RecipiesItemComponent implements OnInit {

  @Input() recipe: Recipie;

  @Input() id: number;

  ngOnInit(): void {

  }

}

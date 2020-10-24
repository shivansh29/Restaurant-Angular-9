import { SharedModule } from './../shared/shared.module';
import { RecipieRouting } from './recipie-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipieStarterComponent } from './recipie-starter/recipie-starter.component';
import { RecipiesDetailsComponent } from './recipies-details/recipies-details.component';
import { RecipiesItemComponent } from './recipies-list/recipies-item/recipies-item.component';
import { RecipiesListComponent } from './recipies-list/recipies-list.component';
import { RecipiesComponent } from './recipies.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RecipiesComponent,
        RecipiesListComponent,
        RecipiesDetailsComponent,
        RecipiesItemComponent,
        RecipieStarterComponent,
        RecipieEditComponent,
    ],
    imports: [
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        RecipieRouting
    ]
    /*exports: [
        RecipiesComponent,
        RecipiesListComponent,
        RecipiesDetailsComponent,  Because these components are not used in this or any child module 
        RecipiesItemComponent,       All are loaded throgh routing 
        RecipieStarterComponent,
        RecipieEditComponent,
    ]*/
})
export class RecipieModule{

}
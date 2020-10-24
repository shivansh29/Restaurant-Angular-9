import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { customRouting } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        customRouting,
        SharedModule,
        FormsModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ]
})
export class ShopListModule{

}
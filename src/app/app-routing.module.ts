
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router'


const appRoute: Routes =[
    { path: '' , redirectTo: '/recipies',  pathMatch: 'full'},
    { path: 'recipies', 
    loadChildren: () => import('./recipies/recipie.newModule').then( m=> m.RecipieModule ) },
    { path: 'auth' , 
    loadChildren: () => import('./auth/auth.module').then( m=> m.AuthModule )  },
    { path:'ShoppingList' ,component: ShoppingListComponent}
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class customRouting{

}
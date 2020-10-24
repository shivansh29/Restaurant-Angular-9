import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../auth/auth.guard.service';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { ResolverService } from './recipie-starter/recipie-resolver.service';
import { RecipieStarterComponent } from './recipie-starter/recipie-starter.component';
import { RecipiesDetailsComponent } from './recipies-details/recipies-details.component';
import { RecipiesComponent } from './recipies.component';


const routes: Routes = [
    { path:'' ,component: RecipiesComponent , canActivate: [AuthGuardService], children: [
        {path: '', component: RecipieStarterComponent},
        {path: 'new', component: RecipieEditComponent},
        {path: ':id' , component: RecipiesDetailsComponent, resolve: [ResolverService]},
        { path: ':id/edit', component: RecipieEditComponent, resolve: [ResolverService]}
    ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class RecipieRouting{

}
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { ShopListModule } from './shopping-list/shoppingList.module';
import { customRouting } from './app-routing.module';
import { HeaderComponent } from './Header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effect';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipieEffects } from './recipies/store/recipie.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    customRouting,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffect, RecipieEffects]),
    StoreRouterConnectingModule.forRoot(),
    ShopListModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

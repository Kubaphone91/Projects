
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { EditListPage } from './../pages/edit-list/edit-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { DBOptionsPage } from '../pages/db-options/db-options';

import { RecipeService } from './../services/recipe.service';
import { ShoppingListService } from './../services/shopping-list.service';
import { AuthService } from './../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    EditListPage,
    SigninPage,
    SignupPage,
    DBOptionsPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    EditListPage,
    SigninPage,
    SignupPage,
    DBOptionsPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,
    AuthService

  ]
})
export class AppModule {}

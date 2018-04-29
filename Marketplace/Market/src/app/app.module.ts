import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CookieModule } from 'ngx-cookie';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BikeListComponent } from './bikes/list/list.component';
import { BikeNewComponent } from './bikes/new/new.component';
import { BikeRandomComponent } from './bikes/random/random.component';
import { BikeEditComponent } from './bikes/edit/edit.component';
import { SearchPipe } from './search.pipe';

import { AuthService } from './services/auth.service';
import { BikeService } from './services/bikes.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    NavComponent,
    BikeListComponent,
    BikeNewComponent,
    BikeRandomComponent,
    BikeEditComponent,
    SearchPipe
  ],
  imports: [
    CookieModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    BikeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

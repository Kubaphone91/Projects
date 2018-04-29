import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DataService } from './services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { SearchPipe } from './search.pipe';

import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PollComponent } from './components/poll/poll.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DashboardComponent,
    LoginComponent,
    PollComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

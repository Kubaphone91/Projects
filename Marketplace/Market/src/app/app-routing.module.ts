import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikeListComponent } from './bikes/list/list.component';
import { BikeEditComponent } from './bikes/edit/edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'browse',
    component: BikeListComponent
  },
  {
    path: 'listings',
    component: BikeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

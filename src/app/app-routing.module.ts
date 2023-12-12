import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserformComponent } from './userform/userform.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {path:"", component:UserlistComponent},
  {path:"register", component:UserformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

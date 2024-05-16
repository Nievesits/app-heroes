import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
 {
  path: '',
  redirectTo: 'heroes',
  pathMatch: 'full'
}, {
  path: 'heroes',
  loadChildren: ( ) => import('./heroes/heroes.module').then( m => m.HeroesModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard] //Anclamos la función del canActive

},
{
  path: 'auth',
  loadChildren: ( ) => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
},

{
  path: '404',
  component: Error404PageComponent,
},

{
  path: '**',
  redirectTo: '404',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

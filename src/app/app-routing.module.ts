import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./page/register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./page/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'destinos-user',
    loadChildren: () => import('./page/destinos-user/destinos-user.module').then( m => m.DestinosUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

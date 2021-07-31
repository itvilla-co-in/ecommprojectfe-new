import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  /* { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent , children: [
    {path: 'zztutorialshome', loadChildren: () => import('../app/TutMod/tutmod.module').then(mod => mod.TutModule)}
  ]},
  {path: 'tutorialshome', loadChildren: () => import('../app/TutMod/tutmod.module').then(mod => mod.TutModule)},
 
 { path: 'tutorialshome', component: TutModhomeComponent , children: [
    {path: 'AngularExamples', loadChildren: () => import('../app/TutMod/tutmod.module').then(mod => mod.TutModule)}
  ]}, 
  */
  //{ path: 'admin/home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'ecomm' },
  { path: 'home', component: AppComponent},
  {path: 'ecomm', loadChildren: () => import('../app/ecommapp/ecommapp.module').then(mod => mod.EcommappModule)}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

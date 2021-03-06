import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FeaturetoggleDetailComponent } from './featuretoggle-detail/featuretoggle-detail.component';
import { FeaturetoggleListComponent } from './featuretoggle-list/featuretoggle-list.component';

const routes: Routes = [
  { path: 'features', component: FeaturetoggleListComponent },
  { path: 'features/:id', component: FeaturetoggleListComponent },
  { path: 'features/add', component: FeaturetoggleListComponent},
  { path: '', redirectTo: '/features/', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

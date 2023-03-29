import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view-dashboard', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'new-dashboard', component: NewDashboardComponent, data: { text: 'NewDashboard' } },
  { path: 'view-dashboard', component: ViewDashboardComponent, data: { text: 'ViewDashboard' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}

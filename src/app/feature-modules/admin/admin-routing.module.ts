import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: PermissionsService.REGISTER_USER,
    component: UserRegistrationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { RegisterComponent} from './components/register/register.component';
import { LoginComponent} from './components/login/login.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ProfileComponent} from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'dashboard' , component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile' , component: ProfileComponent, canActivate:[AuthGuard] },
  { path: '**' , component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), FormsModule],
  bootstrap: [],
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HeaderComponent } from './header-admin/header-admin';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin';
import { NotificationButtonComponent } from './notification-button/notification-button';
import { HomeAdminComponent } from './home-admin/home-admin';
import { InicioComponent } from './admin/inicio/inicio';
import { ClientesComponent } from './admin/clientes/clientes';
<<<<<<< HEAD
=======
import { NewClientComponent } from './admin/clientes/new-client/new-client';
import { RegisterComponent } from './register/register';
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SidebarAdminComponent },
  { path: 'notification', component: NotificationButtonComponent },
  {
    path: 'home-admin', component: HomeAdminComponent, children: [
      { path: 'inicio', loadComponent: () => import('./admin/inicio/inicio').then(m => m.InicioComponent) },
      { path: 'clientes', loadComponent: () => import('./admin/clientes/clientes').then(m => m.ClientesComponent) },
<<<<<<< HEAD
=======
      { path: 'clientes/nuevo', loadComponent: () => import('./admin/clientes/new-client/new-client').then(m => m.NewClientComponent) },
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
      { path: 'historial-optico', loadComponent: () => import('./admin/historial-optico/historial-optico').then(m => m.HistorialOpticoComponent) },
      { path: 'facturacion', loadComponent: () => import('./admin/facturacion/facturacion').then(m => m.FacturacionComponent) },
      { path: 'ajustes', loadComponent: () => import('./admin/ajustes/ajustes').then(m => m.AjustesComponent) },
      { path: 'ayuda', loadComponent: () => import('./admin/ayuda/ayuda').then(m => m.AyudaComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'inicio' }
    ]
  },
  { path: 'inicio', component: InicioComponent },
  { path: 'clientes', component: ClientesComponent},
<<<<<<< HEAD
=======
  { path: 'add', component: NewClientComponent},
  { path: 'register', component: RegisterComponent },
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

];

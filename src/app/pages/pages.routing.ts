import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { LeyesComponent } from './mantenimientos/leyes/leyes.component';
import { ArticulosComponent } from './mantenimientos/articulos/articulos.component';
import { ArticuloComponent } from './mantenimientos/articulos/articulo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'busquedas' }},

            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

            // Mantenimientos
            { path: 'leyes', component: LeyesComponent, data: { titulo: 'Usuario de aplicación' }},
            { path: 'articulos', component: ArticulosComponent, data: { titulo: 'Usuario de aplicación' }},
            { path: 'articulos/:id', component: ArticuloComponent, data: { titulo: 'Usuario de aplicación' }},

                        // Rutas de Admin
            { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},

        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}



import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { authGuard } from './utils/auth.guard';
import { TutoriasComponent } from './components/tutorias/tutorias.component';
import { CrearMensajeComponent } from './components/crear-mensaje/crear-mensaje.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

export const routes: Routes = [
    {   path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Iniciar Sesión'
    },
    {
        path: 'registro',
        component: SignInComponent,
        title: 'Registrarse'
    },
    {
        path: 'Eventos',
        component: InicioComponent,
        canActivate : [authGuard],
        title: 'Politecnianos - Eventos'
    },
    {
        path: 'Tutorias',
        component: TutoriasComponent,
        canActivate : [authGuard],
        title: 'Politecnianos'
    },
    {
        path: 'crearMensaje',
        component: CrearMensajeComponent,
        canActivate : [authGuard],
        title: 'Politecnianos'
    },
    {
        path: 'perfil/:id',
        component: PerfilComponent,
        canActivate : [authGuard],
        title: 'Perfil'
    },
    {
        path: 'editarPerfil',
        component: EditarPerfilComponent,
        canActivate : [authGuard],
        title: 'Perfil - Editar'
    }
    
];

export default routes;

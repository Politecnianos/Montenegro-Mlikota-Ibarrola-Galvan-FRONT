import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { authGuard } from './utils/auth.guard';
import { TutoriasComponent } from './components/tutorias/tutorias.component';

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
        path: 'signIn',
        component: SignInComponent,
        title: 'Registrarse'
    },
    {
        path: 'inicio/:id',
        component: InicioComponent,
        canActivate : [authGuard],
        title: 'Politecnianos'
    },
    {
        path: 'tutorias',
        component: TutoriasComponent,
        canActivate : [authGuard],
        title: 'Politecnianos'
    }
];

export default routes;

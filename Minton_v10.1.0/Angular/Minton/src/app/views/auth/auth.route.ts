import { Route } from '@angular/router'
import { ConfirmMailComponent } from './confirm-mail/confirm-mail.component'
import { LockScreenComponent } from './lock-screen/lock-screen.component'
import { LoginComponent } from './login/login.component'
import { LogoutComponent } from './logout/logout.component'
import { RecoverpwComponent } from './recoverpw/recoverpw.component'
import { RegisterComponent } from './register/register.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Log In' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register & Signup' },
  },
  {
    path: 'recoverpw',
    component: RecoverpwComponent,
    data: { title: 'Forgot Password' },
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
    data: { title: 'Lock Screen' },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout' },
  },
  {
    path: 'confirm-mail',
    component: ConfirmMailComponent,
    data: { title: 'Confirm Mail' },
  },
]

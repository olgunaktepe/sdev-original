import { Route } from '@angular/router'
import { ConfirmMail2Component } from './confirm-mail-2/confirm-mail-2.component'
import { LockScreen2Component } from './lock-screen-2/lock-screen-2.component'
import { Login2Component } from './login-2/login-2.component'
import { Logout2Component } from './logout-2/logout-2.component'
import { Recoverpw2Component } from './recoverpw-2/recoverpw-2.component'
import { Register2Component } from './register-2/register-2.component'
import { SigninSignup2Component } from './signin-signup-2/signin-signup-2.component'

export const AUTH2_ROUTES: Route[] = [
  {
    path: 'login-2',
    component: Login2Component,
    data: { title: 'Log In 2' },
  },
  {
    path: 'register-2',
    component: Register2Component,
    data: { title: 'Register & Signup 2' },
  },
  {
    path: 'signin-signup-2',
    component: SigninSignup2Component,
    data: { title: 'Auth Pages' },
  },
  {
    path: 'recoverpw-2',
    component: Recoverpw2Component,
    data: { title: 'Forgot Password 2' },
  },
  {
    path: 'lock-screen-2',
    component: LockScreen2Component,
    data: { title: 'Lock Screen 2' },
  },
  {
    path: 'logout-2',
    component: Logout2Component,
    data: { title: 'Logout 2' },
  },
  {
    path: 'confirm-mail-2',
    component: ConfirmMail2Component,
    data: { title: 'Confirm Mail 2' },
  },
]

import { Routes } from '@angular/router'
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component'
import { Auth2LayoutComponent } from '@layouts/auth2-layout/auth2-layout.component'
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component'
import { SigninSignupComponent } from '@views/auth/signin-signup/signin-signup.component'

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./views/pages/pages.route').then((mod) => mod.EXTRA_PAGES_ROUTES),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'auth',
    component: Auth2LayoutComponent,
    loadChildren: () =>
      import('./views/auth/auth-2.route').then((mod) => mod.AUTH2_ROUTES),
  },
  {
    path: 'auth/signin-signup',
    component: SigninSignupComponent,
    data: { title: 'Auth Pages' },
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./views/other-pages/other-pages.route').then(
        (mod) => mod.PAGES_ROUTES
      ),
  },
]

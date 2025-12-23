import { inject } from '@angular/core'
import { Router, Routes } from '@angular/router'
import { AuthenticationService } from '@core/service/auth.service'
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component'
import { Auth2LayoutComponent } from '@layouts/auth2-layout/auth2-layout.component'
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component'
import { SigninSignupComponent } from '@views/auth/signin-signup/signin-signup.component'
import { ActionTemplateComponent } from '@views/email/templates/components/action-template/action-template.component'
import { AlertTemplateComponent } from '@views/email/templates/components/alert-template/alert-template.component'
import { BillingTemplateComponent } from '@views/email/templates/components/billing-template/billing-template.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/sales',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [
      (url: any) => {
        const router = inject(Router)
        const authService = inject(AuthenticationService)
        if (!authService.session) {
          return router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: url._routerState.url },
          })
        }
        return true
      },
    ],
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: 'email-templates-action',
    component: ActionTemplateComponent,
  },
  {
    path: 'email-templates-alert',
    component: AlertTemplateComponent,
  },
  {
    path: 'email-templates-billing',
    component: BillingTemplateComponent,
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
      import('./views/pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
]

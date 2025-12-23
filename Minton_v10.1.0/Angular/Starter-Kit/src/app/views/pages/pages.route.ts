import { Route } from '@angular/router'
import { StarterComponent } from './starter/starter.component'
import { Alt404Component } from '@views/pages/alt404/alt404.component'

export const EXTRA_PAGES_ROUTES: Route[] = [
  {
    path: '',
    component: StarterComponent,
    data: { title: 'Starter' },
  },
  {
    path: 'pages/404-alt',
    component: Alt404Component,
    data: { title: 'Error Page | 404 | Page not Found' },
  },
]

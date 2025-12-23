import { Route } from '@angular/router'
import { MaintenanceComponent } from './maintenance/maintenance.component'
import { ComingSoonComponent } from './coming-soon/coming-soon.component'
import { Error404Component } from './error404/error404.component'
import { Error500Component } from './error500/error500.component'

export const PAGES_ROUTES: Route[] = [
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' },
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
    data: { title: 'Coming Soon' },
  },
  {
    path: '404',
    component: Error404Component,
    data: { title: 'Error Page | 404 | Page not Found' },
  },
  {
    path: '500',
    component: Error500Component,
    data: { title: 'Error Page | 500 | Internal Server Error' },
  },
]

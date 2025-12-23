import { Route } from '@angular/router'
import { IndexComponent } from './dashboard/index/index.component'

export const VIEW_ROUTES: Route[] = [
  {
    path: 'dashboard/sales',
    component: IndexComponent,
    data: { title: 'Sales Dashboard' },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.route').then((mod) => mod.DASHBOARD_ROUTES),
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./apps/apps.route').then((mod) => mod.APPS_ROUTES),
  },
  {
    path: 'ecommerce',
    loadChildren: () =>
      import('./ecommerce/ecommerce.route').then((mod) => mod.ECOMMERCE_ROUTES),
  },
  {
    path: 'email',
    loadChildren: () =>
      import('./email/email.route').then((mod) => mod.EMAIL_ROUTES),
  },
  {
    path: 'task',
    loadChildren: () =>
      import('./task/task.route').then((mod) => mod.TASK_ROUTES),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contacts/contacts.route').then((mod) => mod.CONTACT_ROUTES),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./extra-pages/extra-pages.route').then(
        (mod) => mod.EXTRA_PAGES_ROUTES
      ),
  },
  {
    path: 'ui',
    loadChildren: () =>
      import('./base-ui/base-ui.route').then((mod) => mod.UI_ROUTES),
  },
  {
    path: 'extended',
    loadChildren: () =>
      import('./extended-ui/extended-ui.route').then(
        (mod) => mod.EXTENDED_ROUTES
      ),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.route').then((mod) => mod.CHARTS_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES),
  }
]

import { Route } from '@angular/router'

export const VIEW_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.route').then(
        (mod) => mod.EXTRA_PAGES_ROUTES
      ),
  }
]

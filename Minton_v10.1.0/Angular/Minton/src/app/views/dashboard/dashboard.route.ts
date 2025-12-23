import { Route } from '@angular/router'
import { IndexComponent } from './index/index.component'
import { CrmComponent } from './crm/crm.component'
import { AnalyticsComponent } from './analytics/analytics.component'

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: 'sales',
    component: IndexComponent,
    data: { title: 'Sales Dashboard' },
  },
  {
    path: 'crm',
    component: CrmComponent,
    data: { title: 'CRM Dashboard' },
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'Analytics Dashboard' },
  },
]

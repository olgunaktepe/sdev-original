import { Route } from '@angular/router'
import { ApexComponent } from './apex/apex.component'
import { ChartjsComponent } from './chartjs/chartjs.component'

export const CHARTS_ROUTES: Route[] = [
  {
    path: 'apex',
    component: ApexComponent,
    data: { title: 'Apexcharts' },
  },
  {
    path: 'chartjs',
    component: ChartjsComponent,
    data: { title: 'Chartjs' },
  },
]

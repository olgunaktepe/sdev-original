import { Route } from '@angular/router'
import { BasicComponent } from './basic/basic.component'
import { DatatablesComponent } from './datatables/datatables.component'

export const TABLES_ROUTES: Route[] = [
  {
    path: 'basic',
    component: BasicComponent,
    data: { title: 'Basic Tables' },
  },
  {
    path: 'datatables',
    component: DatatablesComponent,
    data: { title: 'Datatables' },
  },
]

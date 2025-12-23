import { Route } from '@angular/router'
import { ListComponent } from './list/list.component'
import { ProfileComponent } from './profile/profile.component'

export const CONTACT_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Contacts & Members Listing' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile' },
  },
]

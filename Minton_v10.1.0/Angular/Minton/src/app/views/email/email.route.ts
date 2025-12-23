import { Route } from '@angular/router'
import { InboxComponent } from './inbox/inbox.component'
import { ReadComponent } from './read/read.component'
import { TemplatesComponent } from './templates/templates.component'

export const EMAIL_ROUTES: Route[] = [
  {
    path: 'inbox',
    component: InboxComponent,
    data: { title: 'Email Inbox' },
  },
  {
    path: 'read',
    component: ReadComponent,
    data: { title: 'Email Read' },
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    data: { title: 'Email Templates' },
  },
]

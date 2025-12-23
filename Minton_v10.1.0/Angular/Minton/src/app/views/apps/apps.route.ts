import { Route } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { CalendarComponent } from './calendar/calendar.component'
import { CompaniesComponent } from './companies/companies.component'
import { TicketsComponent } from './tickets/tickets.component'
import { FileManagerComponent } from './file-manager/file-manager.component'
import { WidgetsComponent } from './widgets/widgets.component'

export const APPS_ROUTES: Route[] = [
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'Chat' },
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: { title: 'Calendar' },
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: { title: 'Companies' },
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    data: { title: 'Tickets' },
  },
  {
    path: 'file-manager',
    component: FileManagerComponent,
    data: { title: 'File Manager' },
  },
  {
    path: 'widgets',
    component: WidgetsComponent,
    data: { title: 'Widgets' },
  },
]

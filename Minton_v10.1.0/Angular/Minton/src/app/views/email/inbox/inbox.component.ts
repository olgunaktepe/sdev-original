import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { LeftbarComponent } from '../leftbar.component'
import { EmailListComponent } from './component/email-list/email-list.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    PageTitleComponent,
    LeftbarComponent,
    EmailListComponent,
    NgbDropdownModule,
  ],
  templateUrl: './inbox.component.html',
  styles: ``,
})
export class InboxComponent {
  breadCrumbItems = [
    { label: 'Email', path: '/email/inbox' },
    { label: 'Inbox', path: '/email/inbox', active: true },
  ]
}

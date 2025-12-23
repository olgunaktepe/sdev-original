import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { LeftbarComponent } from '../leftbar.component'
import { EmailDetailComponent } from './components/email-detail/email-detail.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    PageTitleComponent,
    LeftbarComponent,
    EmailDetailComponent,
    NgbDropdownModule,
  ],
  templateUrl: './read.component.html',
  styles: ``,
})
export class ReadComponent {
  breadCrumbItems = [
    { label: 'Email', path: '/email/inbox' },
    { label: 'Email Read', path: '/email/read', active: true },
  ]
}

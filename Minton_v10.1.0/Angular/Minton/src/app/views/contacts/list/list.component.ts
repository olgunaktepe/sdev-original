import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { contacts } from './data'
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbPaginationModule,
    RouterLink,
    NgbDropdownModule,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  breadCrumbItems = [
    { label: 'Contacts', path: '/contacts/list' },
    { label: 'Members List', path: '/contacts/list', active: true },
  ]

  contactsList = contacts
}

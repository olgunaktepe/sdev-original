import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { companyInfo } from './data'
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [PageTitleComponent, NgbPaginationModule, NgbDropdownModule],
  templateUrl: './companies.component.html',
  styles: ``,
})
export class CompaniesComponent {
  breadCrumbItems = [
    { label: 'Apps', path: '/dashboard/sales' },
    { label: 'Companies', path: '/dashboard/companies', active: true },
  ]

  companyList = companyInfo
}

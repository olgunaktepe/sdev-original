import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { AllResultComponent } from './components/all-result/all-result.component'
import { UsersComponent } from './components/users/users.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    PageTitleComponent,
    AllResultComponent,
    UsersComponent,
    NgbNavModule,
  ],
  templateUrl: './search-results.component.html',
  styles: ``,
})
export class SearchResultsComponent {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/search-results' },
    { label: 'Search Results', path: '/pages/search-results', active: true },
  ]
}

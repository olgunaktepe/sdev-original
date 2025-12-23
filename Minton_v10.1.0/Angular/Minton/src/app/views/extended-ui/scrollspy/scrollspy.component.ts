import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import {
  NgbDropdownModule,
  NgbScrollSpyModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-scrollspy',
  standalone: true,
  imports: [PageTitleComponent, NgbScrollSpyModule, NgbDropdownModule],
  templateUrl: './scrollspy.component.html',
  styles: ``,
})
export class ScrollspyComponent {
  breadCrumbItems = [
    { label: 'Extended UI', path: '/extended/scrollspy' },
    { label: 'Scrollspy', path: '/extended/scrollspy', active: true },
  ]
}

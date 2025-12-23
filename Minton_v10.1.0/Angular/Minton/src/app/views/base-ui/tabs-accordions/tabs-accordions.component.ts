import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-tabs-accordions',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbNavModule,
    NgbAccordionModule,
    NgbCollapseModule,
  ],
  templateUrl: './tabs-accordions.component.html',
  styles: ``,
})
export class TabsAccordionsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/tabs-accordions' },
    { label: 'Tabs & Accordions', path: '/ui/tabs-accordions', active: true },
  ]
  isCollapsed = false
  isCollapsed2 = true
}

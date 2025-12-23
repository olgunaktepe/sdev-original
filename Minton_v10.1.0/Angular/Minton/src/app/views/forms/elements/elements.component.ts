import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [PageTitleComponent, NgbDropdownModule],
  templateUrl: './elements.component.html',
  styles: ``,
})
export class ElementsComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/elements' },
    { label: 'Form Elements', path: '/forms/elements', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [PageTitleComponent, NgbDropdownModule],
  templateUrl: './dropdowns.component.html',
  styles: ``,
})
export class DropdownsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/dropdowns' },
    { label: 'Dropdowns', path: '/ui/dropdowns', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [PageTitleComponent, NgbDropdownModule],
  templateUrl: './buttons.component.html',
  styles: ``,
})
export class ButtonsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/buttons' },
    { label: 'Buttons', path: '/ui/buttons', active: true },
  ]
}

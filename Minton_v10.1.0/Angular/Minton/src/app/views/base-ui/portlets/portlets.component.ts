import { Component } from '@angular/core'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-portlets',
  standalone: true,
  imports: [PageTitleComponent, CustomCardPortletComponent],
  templateUrl: './portlets.component.html',
  styles: ``,
})
export class PortletsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/portlets' },
    { label: 'Portlets', path: '/ui/portlets', active: true },
  ]
}

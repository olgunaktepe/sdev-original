import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [PageTitleComponent, NgbPaginationModule],
  templateUrl: './general.component.html',
  styles: ``,
})
export class GeneralComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/general' },
    { label: 'General UI', path: '/ui/general', active: true },
  ]
}

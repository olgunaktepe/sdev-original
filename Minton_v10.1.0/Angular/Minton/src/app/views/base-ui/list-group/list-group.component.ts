import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-list-group',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './list-group.component.html',
  styles: ``,
})
export class ListGroupComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/list-group' },
    { label: 'List Group', path: '/ui/list-group', active: true },
  ]
}

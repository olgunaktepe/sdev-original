import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-placeholders',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './placeholders.component.html',
  styles: ``,
})
export class PlaceholdersComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/placeholders' },
    { label: 'Placeholders', path: '/ui/placeholders', active: true },
  ]
}

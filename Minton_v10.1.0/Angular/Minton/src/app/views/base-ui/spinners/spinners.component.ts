import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-spinners',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './spinners.component.html',
  styles: ``,
})
export class SpinnersComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/spinners' },
    { label: 'Spinners', path: '/ui/spinners', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-ribbons',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './ribbons.component.html',
  styles: ``,
})
export class RibbonsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/ribbons' },
    { label: 'Ribbons', path: '/ui/ribbons', active: true },
  ]
}

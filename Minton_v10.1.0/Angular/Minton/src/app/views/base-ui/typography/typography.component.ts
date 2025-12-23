import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './typography.component.html',
  styles: ``,
})
export class TypographyComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/typography' },
    { label: 'Typography', path: '/ui/typography', active: true },
  ]
}

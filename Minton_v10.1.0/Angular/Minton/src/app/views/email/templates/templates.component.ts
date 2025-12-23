import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [PageTitleComponent, RouterLink],
  templateUrl: './templates.component.html',
  styles: ``,
})
export class TemplatesComponent {
  breadCrumbItems = [
    { label: 'Email', path: '/email/inbox' },
    { label: 'Email Templates', path: '/email/templates', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-avatars',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './avatars.component.html',
  styles: ``,
})
export class AvatarsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/avatars' },
    { label: 'Avatars', path: '/ui/avatars', active: true },
  ]
}

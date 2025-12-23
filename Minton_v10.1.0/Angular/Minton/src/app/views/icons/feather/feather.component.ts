import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-feather',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './feather.component.html',
  styles: ``,
})
export class FeatherComponent {
  breadCrumbItems = [
    { label: 'Icons', path: '/icons/feather' },
    { label: 'Feather Icons', path: '/icons/feather', active: true },
  ]
}

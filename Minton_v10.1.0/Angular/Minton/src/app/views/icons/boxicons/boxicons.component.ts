import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-boxicons',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './boxicons.component.html',
  styles: ``,
})
export class BoxiconsComponent {
  breadCrumbItems = [
    { label: 'Icons', path: '/icons/boxicons' },
    { label: 'Boxicons', path: '/icons/boxicons', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './grid.component.html',
  styles: ``,
})
export class GridComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/grid' },
    { label: 'Grid System', path: '/ui/grid', active: true },
  ]
}

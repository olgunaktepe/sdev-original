import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [PageTitleComponent, NgbProgressbarModule],
  templateUrl: './progress.component.html',
  styles: ``,
})
export class ProgressComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/progress' },
    { label: 'Progress', path: '/ui/progress', active: true },
  ]
}

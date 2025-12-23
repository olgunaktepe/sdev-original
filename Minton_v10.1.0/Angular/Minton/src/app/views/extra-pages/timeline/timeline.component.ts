import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './timeline.component.html',
  styles: ``,
})
export class TimelineComponent {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/starter' },
    { label: 'Timeline', path: '/pages/timeline', active: true },
  ]
}

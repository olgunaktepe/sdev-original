import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './video.component.html',
  styles: ``,
})
export class VideoComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/video' },
    { label: 'Embed Video', path: '/ui/video', active: true },
  ]
}

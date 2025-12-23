import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './images.component.html',
  styles: ``,
})
export class ImagesComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/images' },
    { label: 'Images', path: '/ui/images', active: true },
  ]
}

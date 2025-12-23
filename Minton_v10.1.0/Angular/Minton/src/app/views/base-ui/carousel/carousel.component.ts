import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [PageTitleComponent, NgbCarouselModule],
  templateUrl: './carousel.component.html',
  styles: ``,
})
export class CarouselComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/carousel' },
    { label: 'Carousel', path: '/ui/carousel', active: true },
  ]
}

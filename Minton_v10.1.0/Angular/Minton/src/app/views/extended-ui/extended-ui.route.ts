import { Route } from '@angular/router'
import { RangeSliderComponent } from './range-slider/range-slider.component'
import { SweetalertComponent } from './sweetalert/sweetalert.component'
import { TourComponent } from './tour/tour.component'
import { ScrollspyComponent } from './scrollspy/scrollspy.component'

export const EXTENDED_ROUTES: Route[] = [
  {
    path: 'range-slider',
    component: RangeSliderComponent,
    data: { title: 'Range Slider' },
  },
  {
    path: 'sweet-alert',
    component: SweetalertComponent,
    data: { title: 'Sweet Alerts' },
  },
  {
    path: 'tour',
    component: TourComponent,
    data: { title: 'Tour' },
  },
  {
    path: 'scrollspy',
    component: ScrollspyComponent,
    data: { title: 'Scrollspy' },
  },
]

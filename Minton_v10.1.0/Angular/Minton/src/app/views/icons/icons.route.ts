import { Route } from '@angular/router'
import { FeatherComponent } from './feather/feather.component'
import { RemixComponent } from './remix/remix.component'
import { BoxiconsComponent } from './boxicons/boxicons.component'
import { MdiComponent } from './mdi/mdi.component'
import { FontAwesomeComponent } from './font-awesome/font-awesome.component'
import { WeatherComponent } from './weather/weather.component'

export const ICONS_ROUTES: Route[] = [
  {
    path: 'feather',
    component: FeatherComponent,
    data: { title: 'Feather Icons' },
  },
  {
    path: 'remix',
    component: RemixComponent,
    data: { title: 'Remix Icons' },
  },
  {
    path: 'boxicons',
    component: BoxiconsComponent,
    data: { title: 'Boxicons' },
  },
  {
    path: 'mdi',
    component: MdiComponent,
    data: { title: 'Material Design Icons' },
  },
  {
    path: 'font-awesome',
    component: FontAwesomeComponent,
    data: { title: 'Font Awesome' },
  },
  {
    path: 'weather',
    component: WeatherComponent,
    data: { title: 'Weather Icons' },
  },
]

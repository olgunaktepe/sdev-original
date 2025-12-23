import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './weather.component.html',
  styles: ``,
})
export class WeatherComponent {
  breadCrumbItems = [
    { label: 'Icons', path: '/icons/weather' },
    { label: 'Weather Icons', path: '/icons/weather', active: true },
  ]
}

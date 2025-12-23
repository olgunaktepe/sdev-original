import { Component, Input } from '@angular/core'
import type { WeatherTypes } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styles: ``,
})
export class WeatherWidgetComponent {
  @Input() item!: WeatherTypes
}

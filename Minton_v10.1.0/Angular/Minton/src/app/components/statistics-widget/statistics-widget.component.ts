import { Component, Input } from '@angular/core'
import { CountUpModule } from 'ngx-countup'

type Trend = {
  value: string
  title: string
  icon: string
  variant: string
}

@Component({
  selector: 'app-statistics-widget',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './statistics-widget.component.html',
  styles: ``,
})
export class StatisticsWidgetComponent {
  @Input() icon!: string
  @Input() stats!: number
  @Input() title!: string
  @Input() trend!: Trend
  @Input() counterOptions?: any
}

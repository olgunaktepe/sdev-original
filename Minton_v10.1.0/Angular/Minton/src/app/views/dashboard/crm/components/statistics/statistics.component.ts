import { Component } from '@angular/core'
import { StatisticsWidgetComponent } from '@component/statistics-widget/statistics-widget.component'

@Component({
  selector: 'crm-statistics',
  standalone: true,
  imports: [StatisticsWidgetComponent],
  templateUrl: './statistics.component.html',
  styles: ``,
})
export class StatisticsComponent {}

import { Component } from '@angular/core'
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'analytics-statistics',
  standalone: true,
  imports: [NgbTooltipModule, NgbAlertModule],
  templateUrl: './statistics.component.html',
  styles: ``,
})
export class StatisticsComponent {}

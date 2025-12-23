import { Component } from '@angular/core'
import { engagementOverview } from '../../data'

@Component({
  selector: 'analytics-engagement-overviews',
  standalone: true,
  imports: [],
  templateUrl: './engagement-overviews.component.html',
  styles: ``,
})
export class EngagementOverviewsComponent {
  engagementList = engagementOverview
}

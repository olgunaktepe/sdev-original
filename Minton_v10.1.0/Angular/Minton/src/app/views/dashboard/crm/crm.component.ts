import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { StatisticsComponent } from './components/statistics/statistics.component'
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component'
import { RecentLeadsComponent } from './components/recent-leads/recent-leads.component'
import { PerformanceDetailsComponent } from './components/performance-details/performance-details.component'
import { CampaignChartComponent } from './components/campaign-chart/campaign-chart.component'
import { TodoComponent } from './components/todo/todo.component'

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [
    PageTitleComponent,
    StatisticsComponent,
    RevenueChartComponent,
    RecentLeadsComponent,
    PerformanceDetailsComponent,
    CampaignChartComponent,
    TodoComponent,
  ],
  templateUrl: './crm.component.html',
  styles: ``,
})
export class CrmComponent {
  breadCrumbItems = [
    { label: 'Dashboards', path: '/dashboard/sales' },
    { label: 'CRM', path: '/dashboard/crm', active: true },
  ]
}

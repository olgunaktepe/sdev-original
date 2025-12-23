import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { StatisticsComponent } from './components/statistics/statistics.component'
import { SessionOverviewComponent } from './components/session-overview/session-overview.component'
import { ChannelsComponent } from './components/channels/channels.component'
import { BrowserUsageComponent } from './components/browser-usage/browser-usage.component'
import { TrafficSourcesComponent } from './components/traffic-sources/traffic-sources.component'
import { SocialMediaTrafficComponent } from './components/social-media-traffic/social-media-traffic.component'
import { EngagementOverviewsComponent } from './components/engagement-overviews/engagement-overviews.component'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    PageTitleComponent,
    StatisticsComponent,
    SessionOverviewComponent,
    ChannelsComponent,
    BrowserUsageComponent,
    TrafficSourcesComponent,
    SocialMediaTrafficComponent,
    EngagementOverviewsComponent,
  ],
  templateUrl: './analytics.component.html',
  styles: ``,
})
export class AnalyticsComponent {
  breadCrumbItems = [
    { label: 'Dashboards', path: '/dashboard/sales' },
    { label: 'Analytics', path: '/dashboard/analytics', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { CountUpModule } from 'ngx-countup'
import { Stat2Component } from './components/stat2/stat2.component'
import { StatisticsChartWidgetComponent } from '@component/statistics-chart-widget/statistics-chart-widget.component'
import { StatisticsWidgetComponent } from '@component/statistics-widget/statistics-widget.component'
import { ProfileStatesComponent } from './components/profile-states/profile-states.component'
import { Stat3Component } from './components/stat3/stat3.component'
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component'
import { weather } from './data'
import { StatisticsChartWidget3Component } from './components/statistics-chart-widget3/statistics-chart-widget3.component'
import { StatisticsChartWidget2Component } from './components/statistics-chart-widget2/statistics-chart-widget2.component'
import { StatisticsChartWidget4Component } from './components/statistics-chart-widget4/statistics-chart-widget4.component'
import { StatisticsChartWidget5Component } from './components/statistics-chart-widget5/statistics-chart-widget5.component'
import { StatisticsChartWidget6Component } from './components/statistics-chart-widget6/statistics-chart-widget6.component'
import { StatisticsChartWidget7Component } from './components/statistics-chart-widget7/statistics-chart-widget7.component'
import { InboxComponent } from './components/inbox/inbox.component'
import { ChatComponent } from './components/chat/chat.component'
import { TodoComponent } from './components/todo/todo.component'

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbDropdownModule,
    CountUpModule,
    Stat2Component,
    StatisticsChartWidgetComponent,
    StatisticsWidgetComponent,
    ProfileStatesComponent,
    Stat3Component,
    WeatherWidgetComponent,
    StatisticsChartWidget2Component,
    StatisticsChartWidget3Component,
    StatisticsChartWidget4Component,
    StatisticsChartWidget5Component,
    StatisticsChartWidget6Component,
    StatisticsChartWidget7Component,
    InboxComponent,
    ChatComponent,
    TodoComponent,
  ],
  templateUrl: './widgets.component.html',
  styles: ``,
})
export class WidgetsComponent {
  breadCrumbItems = [
    { label: 'Components', path: '/apps/widgets' },
    { label: 'Widgets', path: '/apps/widgets', active: true },
  ]

  weather = weather
}

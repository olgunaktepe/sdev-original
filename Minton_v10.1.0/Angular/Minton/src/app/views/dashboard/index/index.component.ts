import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { RevenueReportComponent } from './components/revenue-report/revenue-report.component'
import { ProductSaleComponent } from './components/product-sale/product-sale.component'
import { MarketingReportComponent } from './components/marketing-report/marketing-report.component'
import { LocationComponent } from './components/location/location.component'
import { TopSellingComponent } from './components/top-selling/top-selling.component'
import { HistoryComponent } from './components/history/history.component'
import { ProjectionsComponent } from './components/projections/projections.component'
import { StatisticsChartWidgetComponent } from '@component/statistics-chart-widget/statistics-chart-widget.component'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    PageTitleComponent,
    RevenueReportComponent,
    ProductSaleComponent,
    MarketingReportComponent,
    LocationComponent,
    TopSellingComponent,
    HistoryComponent,
    ProjectionsComponent,
    StatisticsChartWidgetComponent,
  ],
  templateUrl: './index.component.html',
  styles: ``,
})
export class IndexComponent {
  breadCrumbItems = [
    { label: 'Dashboards', path: '/dashboard/sales' },
    { label: 'Sales', path: '/dashboard/sales', active: true },
  ]
}

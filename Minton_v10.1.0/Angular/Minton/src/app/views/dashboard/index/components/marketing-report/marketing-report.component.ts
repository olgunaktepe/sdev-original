import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'sales-marketing-report',
  standalone: true,
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './marketing-report.component.html',
  styles: ``,
})
export class MarketingReportComponent {
  currency = currency
  marketingChart: Partial<ChartOptions> = {
    chart: {
      height: 274,
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
      },
    ],
    stroke: {
      width: 0,
    },
    fill: {
      opacity: 0.4,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    colors: ['#3bafda', '#1abc9c', '#f7b84b'],
    labels: ['2011', '2012', '2013', '2014', '2015', '2016'],
  }
}

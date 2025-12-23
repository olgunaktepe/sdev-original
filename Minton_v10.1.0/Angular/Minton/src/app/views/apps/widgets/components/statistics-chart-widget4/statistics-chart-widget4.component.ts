import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'statistics-chart-widget4',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-chart-widget4.component.html',
  styles: ``,
})
export class StatisticsChartWidget4Component {
  currency = currency
  sparkline3Chart: Partial<ChartOptions> = {
    chart: {
      type: 'pie',
      sparkline: {
        enabled: true,
      },
      height: 168,
    },
    series: [20, 40, 30, 10],
    colors: ['#e3eaef', '#3bafda', '#1abc9c', '#f1556c'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName: string) => {
            return ''
          },
        },
      },
      marker: {
        show: false,
      },
    },
  }
}

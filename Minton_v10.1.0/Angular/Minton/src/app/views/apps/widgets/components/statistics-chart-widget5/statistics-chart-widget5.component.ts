import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'statistics-chart-widget5',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-chart-widget5.component.html',
  styles: ``,
})
export class StatisticsChartWidget5Component {
  currency = currency
  sparkline5Chart: Partial<ChartOptions> = {
    chart: {
      type: 'line',
      height: 165,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        type: 'line',
        data: [0, 23, 43, 35, 44, 45, 56, 37, 40],
      },
      {
        type: 'line',
        data: [25, 23, 26, 24, 25, 32, 30, 24, 19],
      },
    ],
    stroke: {
      curve: 'straight',
      width: [1],
    },
    grid: {
      padding: {
        left: -9,
        right: 0,
      },
    },
    fill: {
      type: 'solid',
    },
    colors: ['#f672a7', '#3bafda'],
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
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

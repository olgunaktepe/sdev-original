import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'statistics-chart-widget6',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-chart-widget6.component.html',
  styles: ``,
})
export class StatisticsChartWidget6Component {
  currency = currency
  sparkline6Chart: Partial<ChartOptions> = {
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
        data: [50, 23, 43, 35, 44, 45, 56, 37, 40],
      },
    ],
    stroke: {
      curve: 'straight',
      width: [1],
    },
    fill: {
      type: 'solid',
      opacity: [0.3],
    },
    grid: {
      padding: {
        left: -9,
        right: 0,
      },
    },
    colors: ['#3bafda'],
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

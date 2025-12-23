import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'statistics-chart-widget2',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-chart-widget2.component.html',
  styles: ``,
})
export class StatisticsChartWidget2Component {
  currency = currency

  sparkline1Chart: Partial<ChartOptions> = {
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
        type: 'area',
        data: [0, 23, 43, 35, 44, 45, 56, 37, 40],
      },
      {
        type: 'area',
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
      opacity: [0.3, 0.3],
    },
    colors: ['#3bafda', '#1abc9c'],
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

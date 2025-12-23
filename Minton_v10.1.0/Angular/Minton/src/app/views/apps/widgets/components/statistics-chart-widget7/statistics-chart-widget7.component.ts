import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'statistics-chart-widget7',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-chart-widget7.component.html',
  styles: ``,
})
export class StatisticsChartWidget7Component {
  currency = currency
  sparkline7Chart: Partial<ChartOptions> = {
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
        type: 'bar',
        data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
      },
      {
        type: 'line',
        data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: '65%',
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
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
    stroke: {
      width: [1.5],
      curve: 'straight',
    },
    colors: ['#1abc9c', '#f1556c'],
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

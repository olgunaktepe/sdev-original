import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'statistics-chart-widget3',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics-chart-widget3.component.html',
  styles: ``,
})
export class StatisticsChartWidget3Component {
  currency = currency

  sparkline2Chart: Partial<ChartOptions> = {
    chart: {
      type: 'bar',
      sparkline: {
        enabled: true,
      },
      height: 165,
    },
    series: [
      {
        data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12],
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: '65%',
      },
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    stroke: {
      width: 0,
      curve: 'smooth',
    },
    colors: ['#3bafda'],
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

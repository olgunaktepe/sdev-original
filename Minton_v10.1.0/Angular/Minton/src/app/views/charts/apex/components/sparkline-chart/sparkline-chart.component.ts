import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'
import { randomizeArray } from '../../data'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'

@Component({
  selector: 'sparkline-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './sparkline-chart.component.html',
  styles: ``,
})
export class SparklineChartComponent {
  sparklineData = [
    47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
    27, 54, 43, 19, 46,
  ]

  spark1Chart: Partial<ChartOptions> = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    fill: {
      opacity: 0.2,
    },
    series: [
      {
        name: 'Minton Sales ',
        data: randomizeArray(this.sparklineData),
      },
    ],
    yaxis: {
      min: 0,
    },
    colors: ['#3bafda'],
    title: {
      text: '$424,652',
      offsetX: 10,
      style: {
        fontSize: '22px',
      },
    },
    subtitle: {
      text: 'Total Sales',
      offsetX: 10,
      offsetY: 35,
      style: {
        fontSize: '13px',
      },
    },
  }

  spark2Chart: Partial<ChartOptions> = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    fill: {
      opacity: 0.2,
    },
    series: [
      {
        name: 'Minton Expenses ',
        data: randomizeArray(this.sparklineData),
      },
    ],
    yaxis: {
      min: 0,
    },
    colors: ['#DCE6EC'],
    title: {
      text: '$235,312',
      offsetX: 10,
      style: {
        fontSize: '22px',
      },
    },
    subtitle: {
      text: 'Expenses',
      offsetX: 10,
      offsetY: 35,
      style: {
        fontSize: '13px',
      },
    },
  }

  spark3Chart: Partial<ChartOptions> = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    fill: {
      opacity: 0.2,
    },
    series: [
      {
        name: 'Net Profits ',
        data: randomizeArray(this.sparklineData),
      },
    ],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
    },
    colors: ['#1abc9c'],
    title: {
      text: '$135,965',
      offsetX: 10,
      style: {
        fontSize: '22px',
      },
    },
    subtitle: {
      text: 'Profits',
      offsetX: 10,
      offsetY: 35,
      style: {
        fontSize: '13px',
      },
    },
  }
}

import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgApexchartsModule } from 'ng-apexcharts'

export type Range = {
  min: number
  max: number
}

export type Point = {
  x: number
  y: number
}

@Component({
  selector: 'crm-revenue-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './revenue-chart.component.html',
  styles: ``,
})
export class RevenueChartComponent {
  currency = currency

  generateDayWiseTimeSeries(baseval: number, count: number, yrange: Range) {
    let i = 0
    let series: Point[] = []
    while (i < count) {
      let x = baseval
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

      series.push({ x, y })
      baseval += 86400000
      i++
    }
    return series
  }

  revenue: Partial<ChartOptions> = {
    chart: {
      height: 260,
      type: 'area',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Total Revenue',
        data: this.generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 100,
            max: 1500,
          }
        ),
      },

      {
        name: 'Total Pipeline',
        data: this.generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 100,
            max: 1000,
          }
        ),
      },
    ],
    colors: ['#3bafda', '#ced4dc'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2],
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0.9,
      },
    },
    legend: {
      offsetY: 5,
    },
    xaxis: {
      type: 'datetime',
    },
    grid: {
      padding: {
        bottom: 10,
      },
    },
    yaxis: {
      title: {
        text: 'Revenue',
        style: {
          color: undefined,
          fontSize: '13px',
          cssClass: 'apexcharts-yaxis-title',
        },
      },
    },
  }
}

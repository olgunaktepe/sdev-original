import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'
// import { generateDayWiseTimeSeries } from '../../data'

@Component({
  selector: 'stacked-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './stacked-chart.component.html',
  styles: ``,
})
export class StackedChartComponent {
  generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { min: number; max: number }
  ) {
    var i = 0
    var series = []
    while (i < count) {
      var x = baseval
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

      series.push([x, y])
      baseval += 86400000
      i++
    }
    return series
  }

  stackedAreaChart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'area',
      stacked: true,
      events: {
        selection: function (chart, e) {},
      },
    },
    colors: ['#3bafda', '#1abc9c', '#CED4DC'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2],
      curve: 'smooth',
    },

    series: [
      {
        name: 'South',
        data: this.generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: 'North',
        data: this.generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 10,
            max: 20,
          }
        ),
      },

      {
        name: 'Central',
        data: this.generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 10,
            max: 15,
          }
        ),
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
  }
}

import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { seriesData } from '../../data'

@Component({
  selector: 'candlestick-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './candlestick-chart.component.html',
  styles: ``,
})
export class CandlestickChartComponent {
  apexcandlestick1Chart: Partial<ChartOptions> = {
    chart: {
      height: 400,
      type: 'candlestick',
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3bafda',
          downward: '#1abc9c',
        },
      },
    },
    series: [
      {
        data: seriesData,
      },
    ],

    stroke: {
      show: true,
      colors: ['#f1f3fa'],
      width: [1, 4],
    },
    xaxis: {
      type: 'datetime',
    },
    grid: {
      borderColor: '#f1f3fa',
    },
  }
}

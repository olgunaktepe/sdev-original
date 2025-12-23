import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { generateData } from '../../data'

@Component({
  selector: 'bubble-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './bubble-chart.component.html',
  styles: ``,
})
export class BubbleChartComponent {
  apexbubble1Chart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bubble',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: 'Bubble 1',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble 2',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble 3',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    fill: {
      opacity: 0.8,
    },
    colors: ['#3bafda', '#1abc9c', '#f672a7'],
    xaxis: {
      tickAmount: 12,
      type: 'category',
    },
    yaxis: {
      max: 70,
    },
    grid: {
      borderColor: '#f1f3fa',
      padding: {
        bottom: 10,
      },
    },
    legend: {
      offsetY: 7,
    },
  }
}

import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { generateData1 } from '../../data'

@Component({
  selector: 'bubble3d-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './bubble3d-chart.component.html',
  styles: ``,
})
export class Bubble3dChartComponent {
  apexbubble2Chart: Partial<ChartOptions> = {
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
        name: 'Product 1',
        data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Product 2',
        data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Product 3',
        data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Product 4',
        data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    fill: {
      type: 'gradient',
    },
    colors: ['#3bafda', '#1abc9c', '#6559cc', '#f672a7'],
    xaxis: {
      tickAmount: 12,
      type: 'datetime',

      labels: {
        rotate: 0,
      },
    },
    yaxis: {
      max: 70,
    },
    legend: {
      offsetY: 7,
    },
    grid: {
      borderColor: '#f1f3fa',
      padding: {
        bottom: 10,
      },
    },
  }
}

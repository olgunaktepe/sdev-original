import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'donut-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './donut-chart.component.html',
  styles: ``,
})
export class DonutChartComponent {
  apexpie2Chart: Partial<ChartOptions> = {
    chart: {
      height: 320,
      type: 'donut',
    },
    series: [44, 55, 41, 17, 15],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: 7,
    },
    labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
    colors: ['#3bafda', '#1abc9c', '#f7b84b', '#6559cc', '#f672a7'],
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    fill: {
      type: 'gradient',
    },
  }
}

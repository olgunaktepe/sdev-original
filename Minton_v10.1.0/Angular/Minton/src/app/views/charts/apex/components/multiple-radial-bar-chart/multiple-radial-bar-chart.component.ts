import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'multiple-radial-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './multiple-radial-bar-chart.component.html',
  styles: ``,
})
export class MultipleRadialBarChartComponent {
  apexradialbar2Chart: Partial<ChartOptions> = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return '249'
            },
          },
        },
      },
    },
    colors: ['#3bafda', '#f672a7', '#1abc9c', '#f7b84b'],
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
  }
}

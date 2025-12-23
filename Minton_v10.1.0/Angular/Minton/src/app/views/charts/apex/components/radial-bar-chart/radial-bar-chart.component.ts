import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'radial-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './radial-bar-chart.component.html',
  styles: ``,
})
export class RadialBarChartComponent {
  apexradialbar1Chart: Partial<ChartOptions> = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    colors: ['#3bafda'],
    series: [70],
    labels: ['CRICKET'],
  }
}

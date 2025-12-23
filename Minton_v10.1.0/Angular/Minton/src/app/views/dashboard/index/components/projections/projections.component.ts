import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'sales-projections',
  standalone: true,
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './projections.component.html',
  styles: ``,
})
export class ProjectionsComponent {
  currency = currency
  projectionsChart: Partial<ChartOptions> = {
    chart: {
      height: 312,
      type: 'donut',
    },
    series: [44, 55, 41, 17],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: 7,
    },
    labels: ['Direct', 'Affilliate', 'Sponsored', 'E-mail'],
    colors: ['#3bafda', '#1abc9c', '#f7b84b', '#f672a7'],
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
  }
}

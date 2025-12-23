import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'crm-campaign-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './campaign-chart.component.html',
  styles: ``,
})
export class CampaignChartComponent {
  campaigns: Partial<ChartOptions> = {
    chart: {
      height: 300,
      type: 'donut',
    },
    series: [44, 55, 41],
    legend: {
      show: false,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    labels: ['Total Sent', 'Reached', 'Opened'],
    colors: ['#f7b84b', '#1abc9c', '#3bafda'],
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 210,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }
}

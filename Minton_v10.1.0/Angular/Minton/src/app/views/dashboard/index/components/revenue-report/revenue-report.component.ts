import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'sales-revenue-report',
  standalone: true,
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './revenue-report.component.html',
  styles: ``,
})
export class RevenueReportComponent {
  currency = currency
  revenueChart: Partial<ChartOptions> = {
    chart: {
      height: 265,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Actual',
        data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
      },
      {
        name: 'Projection',
        data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    legend: {
      show: false,
    },
    colors: ['#3bafda', '#e3eaef'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'k'
        },
        offsetX: -15,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$' + val + 'k'
        },
      },
    },
  }
}

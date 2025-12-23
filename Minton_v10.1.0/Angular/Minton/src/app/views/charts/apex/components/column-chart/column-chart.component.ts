import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'column-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './column-chart.component.html',
  styles: ``,
})
export class ColumnChartComponent {
  apexcolumn1Chart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
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
    colors: ['#3bafda', '#1abc9c', '#CED4DC'],
    series: [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    xaxis: {
      categories: [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
      ],
    },
    legend: {
      offsetY: 5,
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
      padding: {
        bottom: 10,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands'
        },
      },
    },
  }
}

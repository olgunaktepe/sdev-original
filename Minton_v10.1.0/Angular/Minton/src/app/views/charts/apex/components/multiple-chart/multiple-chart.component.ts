import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'multiple-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './multiple-chart.component.html',
  styles: ``,
})
export class MultipleChartComponent {
  apexmixed3Chart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'line',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [0, 0, 3],
    },
    series: [
      {
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    colors: ['#3bafda', '#ebf2f6', '#f672a7'],
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#675db7',
        },
        labels: {
          style: {
            colors: '#675db7',
          },
        },
        title: {
          text: 'Income (thousand crores)',
        },
      },

      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#23b397',
        },
        labels: {
          style: {
            colors: '#23b397',
          },
          offsetX: 10,
        },
        title: {
          text: 'Operating Cashflow (thousand crores)',
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#e36498',
        },
        labels: {
          style: {
            colors: '#e36498',
          },
        },
        title: {
          text: 'Revenue (thousand crores)',
        },
      },
    ],
    tooltip: {
      followCursor: true,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y + ' thousand crores'
          }
          return y
        },
      },
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
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }
}

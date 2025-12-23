import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { currency } from '@common/constants'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'sales-product-sale',
  standalone: true,
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './product-sale.component.html',
  styles: ``,
})
export class ProductSaleComponent {
  currency = currency
  productSaleChart: Partial<ChartOptions> = {
    chart: {
      height: 265,
      type: 'line',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Desktops',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: 'Laptops',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
    stroke: {
      width: [1, 2],
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    colors: ['#3bafda', '#1abc9c'],
    fill: {
      opacity: [0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      '01/01/2020',
      '02/01/2020',
      '03/01/2020',
      '04/01/2020',
      '05/01/2020',
      '06/01/2020',
      '07/01/2020',
      '08/01/2020',
      '09/01/2020',
      '10/01/2020',
      '11/01/2020',
    ],
    markers: {
      size: 0,
    },
    legend: {
      offsetY: 5,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'k'
        },
        offsetX: -10,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' Dollars'
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
  }
}

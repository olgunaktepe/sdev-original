import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'line-data-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './line-data-chart.component.html',
  styles: ``,
})
export class LineDataChartComponent {
  apexline1Chart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#3bafda', '#1abc9c'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3],
      curve: 'smooth',
    },
    series: [
      {
        name: 'High - 2018',
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: 'Low - 2018',
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
      style: {
        fontSize: '14px',
        color: '#666',
      },
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
    },
    markers: {
      size: 6,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }
}

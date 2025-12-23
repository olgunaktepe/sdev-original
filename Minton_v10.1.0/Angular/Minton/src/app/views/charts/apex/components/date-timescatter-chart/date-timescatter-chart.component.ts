import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { generateDayWiseTimeSeries } from '../../data'

@Component({
  selector: 'date-timescatter-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './date-timescatter-chart.component.html',
  styles: ``,
})
export class DateTimescatterChartComponent {
  apexscatter2Chart: Partial<ChartOptions> = {
    chart: {
      height: 380,
      type: 'scatter',
      zoom: {
        type: 'xy',
      },
    },
    series: [
      {
        name: 'Team 1',
        data: generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: 'Team 2',
        data: generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          20,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: 'Team 3',
        data: generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          30,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: 'Team 4',
        data: generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          10,
          {
            min: 10,
            max: 60,
          }
        ),
      },
      {
        name: 'Team 5',
        data: generateDayWiseTimeSeries(
          new Date('11 Feb 2017 GMT').getTime(),
          30,
          {
            min: 10,
            max: 60,
          }
        ),
      },
    ],
    dataLabels: {
      enabled: false,
    },
    colors: ['#3bafda', '#1abc9c', '#f672a7', '#6c757d', '#6559cc'],
    grid: {
      borderColor: '#f1f3fa',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        bottom: 10,
      },
    },
    legend: {
      offsetY: 7,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      max: 70,
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

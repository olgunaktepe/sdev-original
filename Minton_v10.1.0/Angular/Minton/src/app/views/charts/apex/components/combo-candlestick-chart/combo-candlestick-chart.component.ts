import { Component } from '@angular/core'
import type { ChartOptions } from '@common/apexchart.model'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { seriesData, seriesDataLinear } from '../../data'

@Component({
  selector: 'combo-candlestick-chart',
  standalone: true,
  imports: [NgApexchartsModule, CustomCardPortletComponent],
  templateUrl: './combo-candlestick-chart.component.html',
  styles: ``,
})
export class ComboCandlestickChartComponent {
  apexcandlestick2Chart: Partial<ChartOptions> = {
    chart: {
      height: 240,
      type: 'candlestick',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#3bafda', '#f7b84b'],
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3bafda',
          downward: '#f7b84b',
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
    grid: {
      borderColor: '#f1f3fa',
    },
    series: [
      {
        data: seriesData,
      },
    ],
  }

  apexcandlestick3Chart: Partial<ChartOptions> = {
    chart: {
      height: 160,
      type: 'bar',
      toolbar: {
        show: false,
        autoSelected: 'selection',
      },
      selection: {
        xaxis: {
          min: new Date('20 Jan 2017').getTime(),
          max: new Date('10 Dec 2017').getTime(),
        },
        fill: {
          color: '#6c757d',
          opacity: 0.4,
        },
        stroke: {
          color: '#6c757d',
        },
      },
      events: {
        selection: function (chart, e) {
          // chartCandlestick.updateOptions({
          //     xaxis: {
          //         min: e.xaxis.min,
          //         max: e.xaxis.max
          //     }
          // }, false, false)
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        colors: {
          ranges: [
            {
              from: -1000,
              to: 0,
              color: '#f45454',
            },
            {
              from: 1,
              to: 10000,
              color: '#37cde6',
            },
          ],
        },
      },
    },
    series: [
      {
        name: 'volume',
        data: seriesDataLinear,
      },
    ],
    xaxis: {
      type: 'datetime',
      axisBorder: {
        offsetX: 13,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      borderColor: '#f1f3fa',
    },
  }
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { BaseChartDirective } from 'ng2-charts'
import { ChartType, hexToRGB } from './chartjs.model'

import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  DoughnutController,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js'
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement,
  BarController,
  DoughnutController,
  ArcElement,
  PolarAreaController,
  RadialLinearScale,
  PieController,
  RadarController
)

@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [PageTitleComponent, BaseChartDirective],
  templateUrl: './chartjs.component.html',
  styles: ``,
})
export class ChartjsComponent {
  breadCrumbItems = [
    { label: 'Charts', path: '/charts/chartjs' },
    { label: 'Chartjs', path: '/charts/chartjs', active: true },
  ]

  public lineAreaChart: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Current Week',
          backgroundColor: hexToRGB('#3bafda', 0.3),
          borderColor: '#3bafda',
          data: [32, 42, 42, 62, 52, 75, 62],
          fill: true,
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          pointRadius: 3,
          pointBorderWidth: 1,
          tension: 0.3,
        },
        {
          label: 'Previous Week',
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#f672a7',
          borderDash: [5, 5],
          data: [42, 58, 66, 93, 82, 105, 92],
          tension: 0.3,
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      hover: {
        intersect: true,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          intersect: false,
        },
        filler: {
          propagate: false,
        },
      },

      scales: {
        y: {
          display: true,
          ticks: {
            stepSize: 20,
          },
          grid: {
            color: 'rgba(0,0,0,0)',
          },
          border: {
            dash: [5, 5],
          },
        },
        x: {
          grid: {
            color: 'rgba(150, 150, 150, 0.1)',
          },
        },
      },
    },
  }

  public barCharts: ChartType = {
    data: {
      labels: [
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
      datasets: [
        {
          label: 'Sales Analytics',
          data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
          backgroundColor: '#1abc9c',
          borderColor: '#1abc9c',
          hoverBackgroundColor: '#1abc9c',
          hoverBorderColor: '#1abc9c',
          barPercentage: 0.7,
          categoryPercentage: 0.5,
        },
        {
          label: 'Dollar Rate',
          data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
          backgroundColor: '#e3eaef',
          borderColor: '#e3eaef',
          hoverBackgroundColor: '#e3eaef',
          hoverBorderColor: '#e3eaef',
          barPercentage: 0.7,
          categoryPercentage: 0.5,
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      bar: {
        datasets: {
          barPercentage: 0.7,
          categoryPercentage: 0.5,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,

          stacked: false,
          ticks: {
            stepSize: 20,
          },
          grid: {
            display: false,
          },
        },
        x: {
          stacked: false,
          grid: {
            color: 'rgba(0,0,0,0.01)',
          },
        },
      },
    },
  }

  public donutChartConfig: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['Direct', 'Affilliate', 'Sponsored'],
      datasets: [
        {
          data: [128, 78, 48],
          backgroundColor: ['#3bafda', '#1abc9c', '#e3eaef'],
          borderColor: 'transparent',
          borderRadius: 0,
        },
      ],
    },
    options: {
      cutout: 100,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  }

  public polarChart: ChartType = {
    data: {
      labels: ['Direct', 'Affilliate', 'Sponsored', 'E-mail'],
      datasets: [
        {
          data: [251, 135, 48, 154],
          backgroundColor: ['#3bafda', '#f7b84b', '#1abc9c', '#e3eaef'],
          borderColor: 'transparent',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(150, 150, 150, 0.1)',
          },
          ticks: {
            backdropColor: 'transparent',
          },
        },
      },
    },
  }

  public pieChart: ChartType = {
    data: {
      labels: ['Direct', 'Affilliate', 'Sponsored', 'E-mail'],
      datasets: [
        {
          data: [300, 135, 48, 154],
          backgroundColor: ['#3bafda', '#1abc9c', '#f7b84b', '#e3eaef'],
          borderColor: 'transparent',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  }
  // #3bafda,#f672a7
  public radarChart: ChartType = {
    data: {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running',
      ],
      datasets: [
        {
          label: 'Desktops',
          data: [65, 59, 90, 81, 56, 55, 40],
          backgroundColor: hexToRGB('#3bafda', 0.3),
          borderColor: ['#3bafda'],
          pointBackgroundColor: '#3bafda',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3bafda',
        },
        {
          label: 'Tablets',
          data: [28, 48, 40, 19, 96, 27, 100],
          backgroundColor: hexToRGB('#f672a7', 0.3),
          borderColor: ['#f672a7'],
          pointBackgroundColor: '#f672a7',
          pointBorderColor: '#fff"',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#f672a7',
          fill: true,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(150, 150, 150, 0.1)',
          },
          ticks: {
            backdropColor: 'transparent',
          },
        },
      },
    },
  }
}

import { DecimalPipe } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'
import { CountUpModule } from 'ngx-countup'

@Component({
  selector: 'app-statistics-chart-widget',
  standalone: true,
  imports: [NgApexchartsModule, CountUpModule, NgbDropdownModule],
  templateUrl: './statistics-chart-widget.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StatisticsChartWidgetComponent {
  @Input() hasHeader?: boolean = false
  @Input() title?: string = ''
  @Input() color: string = '#727cf5' // default color
  @Input() data: number = 0
  @Input() stats: number = 0
  @Input() description: string = ''
  @Input() counterOptions?: any

  apexOpts: any
  apexData: number[]

  constructor() {
    this.apexData = [this.data]
  }

  ngOnChanges(): void {
    this.apexOpts = {
      chart: {
        type: 'radialBar',
        width: 82,
        height: 82,
        sparkline: { enabled: true },
      },
      dataLabels: { enabled: false },
      plotOptions: {
        radialBar: {
          hollow: { margin: 0, size: '77%' },
          track: { margin: 0 },
          dataLabels: {
            name: { show: false },
            value: {
              show: true,
              color: this.color,
              fontSize: '14px',
              offsetY: 5,
              formatter: (val: number) => String(val),
            },
          },
        },
      },
      states: {
        hover: { filter: { type: 'none' } },
      },
      colors: [this.color],
    }

    // Update data series
    this.apexData = [this.data]
  }
}

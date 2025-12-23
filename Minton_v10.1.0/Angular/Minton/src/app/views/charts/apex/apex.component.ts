import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { SparklineChartComponent } from './components/sparkline-chart/sparkline-chart.component'
import { LineDataChartComponent } from './components/line-data-chart/line-data-chart.component'
import { GradientLineChartComponent } from './components/gradient-line-chart/gradient-line-chart.component'
import { StackedChartComponent } from './components/stacked-chart/stacked-chart.component'
import { ColumnChartComponent } from './components/column-chart/column-chart.component'
import { ColumnDatalabelChartComponent } from './components/column-datalabel-chart/column-datalabel-chart.component'
import { MixedChartComponent } from './components/mixed-chart/mixed-chart.component'
import { BarChartComponent } from './components/bar-chart/bar-chart.component'
import { NagativeBarChartComponent } from './components/nagative-bar-chart/nagative-bar-chart.component'
import { AreaChartComponent } from './components/area-chart/area-chart.component'
import { MultipleChartComponent } from './components/multiple-chart/multiple-chart.component'
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component'
import { Bubble3dChartComponent } from './components/bubble3d-chart/bubble3d-chart.component'
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component'
import { DateTimescatterChartComponent } from './components/date-timescatter-chart/date-timescatter-chart.component'
import { CandlestickChartComponent } from './components/candlestick-chart/candlestick-chart.component'
import { ComboCandlestickChartComponent } from './components/combo-candlestick-chart/combo-candlestick-chart.component'
import { PieChartComponent } from './components/pie-chart/pie-chart.component'
import { DonutChartComponent } from './components/donut-chart/donut-chart.component'
import { PatternDonutChartComponent } from './components/pattern-donut-chart/pattern-donut-chart.component'
import { RadialBarChartComponent } from './components/radial-bar-chart/radial-bar-chart.component'
import { MultipleRadialBarChartComponent } from './components/multiple-radial-bar-chart/multiple-radial-bar-chart.component'
import { GuageChartComponent } from './components/guage-chart/guage-chart.component'

@Component({
  selector: 'app-apex',
  standalone: true,
  imports: [
    PageTitleComponent,
    SparklineChartComponent,
    LineDataChartComponent,
    GradientLineChartComponent,
    StackedChartComponent,
    ColumnChartComponent,
    ColumnDatalabelChartComponent,
    MixedChartComponent,
    BarChartComponent,
    NagativeBarChartComponent,
    AreaChartComponent,
    MultipleChartComponent,
    BubbleChartComponent,
    Bubble3dChartComponent,
    ScatterChartComponent,
    DateTimescatterChartComponent,
    CandlestickChartComponent,
    ComboCandlestickChartComponent,
    PieChartComponent,
    DonutChartComponent,
    PatternDonutChartComponent,
    RadialBarChartComponent,
    MultipleRadialBarChartComponent,
    GuageChartComponent,
  ],
  templateUrl: './apex.component.html',
  styles: ``,
})
export class ApexComponent {
  breadCrumbItems = [
    { label: 'Charts', path: '/charts/apex' },
    { label: 'Apexcharts', path: '/charts/apex', active: true },
  ]
}

import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PageTitleComponent } from '@component/page-title.component'
import { NouisliderModule } from 'ng2-nouislider'

@Component({
  selector: 'app-range-slider',
  standalone: true,
  imports: [PageTitleComponent, NouisliderModule, FormsModule],
  templateUrl: './range-slider.component.html',
  styles: ``,
})
export class RangeSliderComponent {
  breadCrumbItems = [
    { label: 'Extended UI', path: '/extended/range-slider' },
    { label: 'Range Slider', path: '/extended/range-slider', active: true },
  ]

  someKeyboard = [1, 3]
  someRange2 = [500, 4000]
  someRange3 = [20, 75]
  someRange = 10
  range = [-500, 500]
  // verticalRange = [60, 160];

  verticalConfig = {
    start: [60, 160],
    connect: true,
    orientation: 'vertical',
    range: {
      min: 0,
      max: 200,
    },
  }

  someRange2config = {
    behaviour: 'drag',
    connect: true,
    margin: 4,
    range: {
      min: [0],
      max: [10000],
    },
    pips: {
      mode: 'steps',
      density: 5,
    },
  }

  someKeyboardConfig = {
    behaviour: 'drag',
    connect: true,
    start: [0, 5],
    keyboard: true,
    step: 0.1,
    pageSteps: 10,
    range: {
      min: 0,
      max: 5,
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true,
    },
  }
}

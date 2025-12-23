import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateTimescatterChartComponent } from './date-timescatter-chart.component'

describe('DateTimescatterChartComponent', () => {
  let component: DateTimescatterChartComponent
  let fixture: ComponentFixture<DateTimescatterChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimescatterChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DateTimescatterChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

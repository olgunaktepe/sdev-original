import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidget2Component } from './statistics-chart-widget2.component'

describe('StatisticsChartWidget2Component', () => {
  let component: StatisticsChartWidget2Component
  let fixture: ComponentFixture<StatisticsChartWidget2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidget2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidget2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidget3Component } from './statistics-chart-widget3.component'

describe('StatisticsChartWidget3Component', () => {
  let component: StatisticsChartWidget3Component
  let fixture: ComponentFixture<StatisticsChartWidget3Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidget3Component],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidget3Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

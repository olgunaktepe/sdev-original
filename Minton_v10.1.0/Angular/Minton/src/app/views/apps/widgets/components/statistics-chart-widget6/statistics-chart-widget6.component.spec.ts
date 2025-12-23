import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidget6Component } from './statistics-chart-widget6.component'

describe('StatisticsChartWidget6Component', () => {
  let component: StatisticsChartWidget6Component
  let fixture: ComponentFixture<StatisticsChartWidget6Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidget6Component],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidget6Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

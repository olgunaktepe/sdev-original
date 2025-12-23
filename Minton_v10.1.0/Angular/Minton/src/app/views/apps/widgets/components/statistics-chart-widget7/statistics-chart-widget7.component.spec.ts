import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidget7Component } from './statistics-chart-widget7.component'

describe('StatisticsChartWidget7Component', () => {
  let component: StatisticsChartWidget7Component
  let fixture: ComponentFixture<StatisticsChartWidget7Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidget7Component],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidget7Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

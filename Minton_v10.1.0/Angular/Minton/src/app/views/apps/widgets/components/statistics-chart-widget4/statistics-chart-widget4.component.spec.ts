import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidget4Component } from './statistics-chart-widget4.component'

describe('StatisticsChartWidget4Component', () => {
  let component: StatisticsChartWidget4Component
  let fixture: ComponentFixture<StatisticsChartWidget4Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidget4Component],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidget4Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

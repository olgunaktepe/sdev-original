import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidget5Component } from './statistics-chart-widget5.component'

describe('StatisticsChartWidget5Component', () => {
  let component: StatisticsChartWidget5Component
  let fixture: ComponentFixture<StatisticsChartWidget5Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidget5Component],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidget5Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

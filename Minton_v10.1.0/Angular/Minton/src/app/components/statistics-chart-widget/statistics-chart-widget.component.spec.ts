import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsChartWidgetComponent } from './statistics-chart-widget.component'

describe('StatisticsChartWidgetComponent', () => {
  let component: StatisticsChartWidgetComponent
  let fixture: ComponentFixture<StatisticsChartWidgetComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartWidgetComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(StatisticsChartWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

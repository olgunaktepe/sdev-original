import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PatternDonutChartComponent } from './pattern-donut-chart.component'

describe('PatternDonutChartComponent', () => {
  let component: PatternDonutChartComponent
  let fixture: ComponentFixture<PatternDonutChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternDonutChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PatternDonutChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

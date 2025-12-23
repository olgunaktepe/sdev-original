import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MultipleRadialBarChartComponent } from './multiple-radial-bar-chart.component'

describe('MultipleRadialBarChartComponent', () => {
  let component: MultipleRadialBarChartComponent
  let fixture: ComponentFixture<MultipleRadialBarChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleRadialBarChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MultipleRadialBarChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

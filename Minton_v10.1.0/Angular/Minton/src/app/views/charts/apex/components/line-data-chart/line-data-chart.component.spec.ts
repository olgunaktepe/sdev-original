import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LineDataChartComponent } from './line-data-chart.component'

describe('LineDataChartComponent', () => {
  let component: LineDataChartComponent
  let fixture: ComponentFixture<LineDataChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineDataChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LineDataChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

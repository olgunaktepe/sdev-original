import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ComboCandlestickChartComponent } from './combo-candlestick-chart.component'

describe('ComboCandlestickChartComponent', () => {
  let component: ComboCandlestickChartComponent
  let fixture: ComponentFixture<ComboCandlestickChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboCandlestickChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ComboCandlestickChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

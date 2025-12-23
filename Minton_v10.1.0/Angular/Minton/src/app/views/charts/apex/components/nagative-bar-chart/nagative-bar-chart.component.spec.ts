import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NagativeBarChartComponent } from './nagative-bar-chart.component'

describe('NagativeBarChartComponent', () => {
  let component: NagativeBarChartComponent
  let fixture: ComponentFixture<NagativeBarChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NagativeBarChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(NagativeBarChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Bubble3dChartComponent } from './bubble3d-chart.component'

describe('Bubble3dChartComponent', () => {
  let component: Bubble3dChartComponent
  let fixture: ComponentFixture<Bubble3dChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bubble3dChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(Bubble3dChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ColumnDatalabelChartComponent } from './column-datalabel-chart.component'

describe('ColumnDatalabelChartComponent', () => {
  let component: ColumnDatalabelChartComponent
  let fixture: ComponentFixture<ColumnDatalabelChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnDatalabelChartComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ColumnDatalabelChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

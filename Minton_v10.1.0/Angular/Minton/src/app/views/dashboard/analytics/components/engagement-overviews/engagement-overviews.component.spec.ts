import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EngagementOverviewsComponent } from './engagement-overviews.component'

describe('EngagementOverviewsComponent', () => {
  let component: EngagementOverviewsComponent
  let fixture: ComponentFixture<EngagementOverviewsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementOverviewsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EngagementOverviewsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

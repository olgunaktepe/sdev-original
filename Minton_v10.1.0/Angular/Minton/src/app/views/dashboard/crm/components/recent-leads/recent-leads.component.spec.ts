import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecentLeadsComponent } from './recent-leads.component'

describe('RecentLeadsComponent', () => {
  let component: RecentLeadsComponent
  let fixture: ComponentFixture<RecentLeadsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentLeadsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RecentLeadsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

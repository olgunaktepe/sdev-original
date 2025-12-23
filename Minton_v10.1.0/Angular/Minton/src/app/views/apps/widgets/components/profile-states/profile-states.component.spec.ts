import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileStatesComponent } from './profile-states.component'

describe('ProfileStatesComponent', () => {
  let component: ProfileStatesComponent
  let fixture: ComponentFixture<ProfileStatesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStatesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProfileStatesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

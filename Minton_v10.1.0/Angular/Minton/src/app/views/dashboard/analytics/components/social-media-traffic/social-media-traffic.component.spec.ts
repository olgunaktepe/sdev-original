import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialMediaTrafficComponent } from './social-media-traffic.component'

describe('SocialMediaTrafficComponent', () => {
  let component: SocialMediaTrafficComponent
  let fixture: ComponentFixture<SocialMediaTrafficComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaTrafficComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SocialMediaTrafficComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

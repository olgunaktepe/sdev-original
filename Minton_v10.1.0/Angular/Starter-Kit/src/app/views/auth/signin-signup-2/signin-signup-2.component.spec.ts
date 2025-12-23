import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SigninSignup2Component } from './signin-signup-2.component'

describe('SigninSignup2Component', () => {
  let component: SigninSignup2Component
  let fixture: ComponentFixture<SigninSignup2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninSignup2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(SigninSignup2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

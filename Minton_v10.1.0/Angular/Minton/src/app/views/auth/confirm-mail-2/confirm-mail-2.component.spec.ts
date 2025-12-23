import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConfirmMail2Component } from './confirm-mail-2.component'

describe('ConfirmMail2Component', () => {
  let component: ConfirmMail2Component
  let fixture: ComponentFixture<ConfirmMail2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmMail2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(ConfirmMail2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

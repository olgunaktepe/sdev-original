import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Stat3Component } from './stat3.component'

describe('Stat3Component', () => {
  let component: Stat3Component
  let fixture: ComponentFixture<Stat3Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stat3Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Stat3Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

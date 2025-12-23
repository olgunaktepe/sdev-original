import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Recoverpw2Component } from './recoverpw-2.component'

describe('Recoverpw2Component', () => {
  let component: Recoverpw2Component
  let fixture: ComponentFixture<Recoverpw2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recoverpw2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Recoverpw2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MasksComponent } from './masks.component'

describe('MasksComponent', () => {
  let component: MasksComponent
  let fixture: ComponentFixture<MasksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasksComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MasksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

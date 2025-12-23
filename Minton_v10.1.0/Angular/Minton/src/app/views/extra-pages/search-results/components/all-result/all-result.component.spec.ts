import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AllResultComponent } from './all-result.component'

describe('AllResultComponent', () => {
  let component: AllResultComponent
  let fixture: ComponentFixture<AllResultComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllResultComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AllResultComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

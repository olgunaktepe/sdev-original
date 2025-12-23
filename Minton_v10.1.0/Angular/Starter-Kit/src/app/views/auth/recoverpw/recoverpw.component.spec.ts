import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecoverpwComponent } from './recoverpw.component'

describe('RecoverpwComponent', () => {
  let component: RecoverpwComponent
  let fixture: ComponentFixture<RecoverpwComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverpwComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RecoverpwComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

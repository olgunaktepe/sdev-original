import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Auth2LayoutComponent } from './auth2-layout.component'

describe('Auth2LayoutComponent', () => {
  let component: Auth2LayoutComponent
  let fixture: ComponentFixture<Auth2LayoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auth2LayoutComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(Auth2LayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

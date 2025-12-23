import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BillingTemplateComponent } from './billing-template.component'

describe('BillingTemplateComponent', () => {
  let component: BillingTemplateComponent
  let fixture: ComponentFixture<BillingTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingTemplateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BillingTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

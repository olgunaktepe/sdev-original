import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { pricingPlans } from '../data'
import { CommonModule } from '@angular/common'
import { currency } from '@common/constants'

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [PageTitleComponent, CommonModule],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/pricing' },
    { label: 'Pricing', path: '/pages/pricing', active: true },
  ]

  pricingPlans = pricingPlans
  currency = currency
}

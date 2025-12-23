import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { BillingInfoComponent } from './components/billing-info/billing-info.component'
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component'
import { PaymentInfoComponent } from './components/payment-info/payment-info.component'
import type { CartItemTypes } from '../data'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbNavModule,
    BillingInfoComponent,
    ShippingInfoComponent,
    PaymentInfoComponent,
    RouterLink,
  ],
  templateUrl: './checkout.component.html',
  styles: ``,
})
export class CheckoutComponent {
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    {
      label: 'Checkout',
      path: '/ecommerce/checkout',
      active: true,
    },
  ]

  items: CartItemTypes[] = [
    {
      id: 1,
      image: 'assets/images/products/product-1.png',
      name: 'Blue color T-shirt',
      size: 'Large',
      color: 'Light Green',
      price: 41,
      qty: 1,
      total: 41,
    },
    {
      id: 2,
      image: 'assets/images/products/product-6.png',
      name: 'Blue Hoodie for men',
      size: 'Medium',
      color: 'Light pink',
      price: 45,
      qty: 2,
      total: 90,
    },
    {
      id: 3,
      image: 'assets/images/products/product-8.png',
      name: 'Full sleeve Pink T-shirt',
      size: 'Large',
      color: 'Green',
      price: 45,
      qty: 1,
      total: 45,
    },
  ]
}

import { Component } from '@angular/core'
import { currency } from '@common/constants'

@Component({
  selector: 'checkout-shipping-info',
  standalone: true,
  imports: [],
  templateUrl: './shipping-info.component.html',
  styles: ``,
})
export class ShippingInfoComponent {
  currency = currency
}

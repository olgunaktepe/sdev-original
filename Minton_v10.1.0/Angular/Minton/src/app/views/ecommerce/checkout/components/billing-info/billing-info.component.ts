import { Component } from '@angular/core'
import { countries } from '../../data'
import { Select2 } from 'ng-select2-component'

@Component({
  selector: 'checkout-billing-info',
  standalone: true,
  imports: [Select2],
  templateUrl: './billing-info.component.html',
  styles: ``,
})
export class BillingInfoComponent {
  countryList = countries
}

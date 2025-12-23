import { Component } from '@angular/core'
import { products } from '../../data'
import { DecimalPipe } from '@angular/common'
import { CustomCardPortletComponent } from '@component/custom-card-portlet/custom-card-portlet.component'
import { currency } from '@common/constants'

@Component({
  selector: 'sales-top-selling',
  standalone: true,
  imports: [DecimalPipe, CustomCardPortletComponent],
  templateUrl: './top-selling.component.html',
  styles: ``,
})
export class TopSellingComponent {
  productList = products
  currency = currency
}

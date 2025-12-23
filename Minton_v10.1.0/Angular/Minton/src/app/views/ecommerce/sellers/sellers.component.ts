import { Component, inject } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { sellers } from '../data'
import { CommonModule, DecimalPipe } from '@angular/common'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { currency } from '@common/constants'

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [
    PageTitleComponent,
    CommonModule,
    NgbDropdownModule,
    DecimalPipe,
    FormsModule,
  ],
  templateUrl: './sellers.component.html',
  styles: ``,
})
export class SellersComponent {
  currency = currency
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    {
      label: 'Sellers',
      path: '/ecommerce/sellers',
      active: true,
    },
  ]

  sellerList = sellers
}

import { Component } from '@angular/core'
import { currency } from '@common/constants'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'product-stock',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './stock.component.html',
  styles: ``,
})
export class StockComponent {
  currency = currency
}

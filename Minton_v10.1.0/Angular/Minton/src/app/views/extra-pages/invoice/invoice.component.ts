import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { invoiceData } from '../data'
import { DecimalPipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { currency } from '@common/constants'

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [PageTitleComponent, DecimalPipe, RouterLink],
  templateUrl: './invoice.component.html',
  styles: ``,
})
export class InvoiceComponent {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/invoice' },
    { label: 'Invoice', path: '/pages/invoice', active: true },
  ]

  currency = currency
  invoice = invoiceData
}

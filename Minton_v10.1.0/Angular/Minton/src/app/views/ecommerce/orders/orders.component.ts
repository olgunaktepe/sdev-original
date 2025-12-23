import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, ViewChildren, type QueryList } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { currency } from '@common/constants'
import { PageTitleComponent } from '@component/page-title.component'
import { TableFooterComponent } from '@component/table/table-footer/table-footer.component'
import { NgbdSortableHeader } from '@core/directive/sortable.directive'
import { TableService } from '@core/service/table.service'
import type { Observable } from 'rxjs'
import { orders, type OrdersItemTypes } from '../data'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    PageTitleComponent,
    TableFooterComponent,
    AsyncPipe,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './orders.component.html',
  styles: ``,
})
export class OrdersComponent {
  currency = currency
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    { label: 'Orders', path: '/ecommerce/orders', active: true },
  ]

  orders$: Observable<OrdersItemTypes[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<OrdersItemTypes>
  >

  constructor(public tableService: TableService<OrdersItemTypes>) {
    this.orders$ = tableService.items$
    this.total$ = tableService.total$
  }

  ngOnInit(): void {
    this.tableService.setItems(orders, 10)
  }
}

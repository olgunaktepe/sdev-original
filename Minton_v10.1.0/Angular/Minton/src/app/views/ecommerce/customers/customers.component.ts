import { Component, ViewChildren, type QueryList } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { customers, type CustomersItemTypes } from '../data'
import { TableHeaderComponent } from '@component/table/table-header/table-header.component'
import { TableFooterComponent } from '@component/table/table-footer/table-footer.component'
import type { Observable } from 'rxjs'
import {
  NgbdSortableHeader,
  type SortEvent,
} from '@core/directive/sortable.directive'
import { TableService } from '@core/service/table.service'
import { AsyncPipe, CommonModule } from '@angular/common'
import { currency } from '@common/constants'

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    PageTitleComponent,
    TableHeaderComponent,
    TableFooterComponent,
    AsyncPipe,
    NgbdSortableHeader,
    CommonModule,
  ],
  templateUrl: './customers.component.html',
  styles: ``,
})
export class CustomersComponent {
  currency = currency
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    {
      label: 'Customers',
      path: '/ecommerce/customers',
      active: true,
    },
  ]

  customer$: Observable<CustomersItemTypes[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<CustomersItemTypes>
  >

  constructor(public tableService: TableService<CustomersItemTypes>) {
    this.customer$ = tableService.items$
    this.total$ = tableService.total$
  }

  ngOnInit(): void {
    this.tableService.setItems(customers, 10)
  }

  onSort(event: SortEvent<CustomersItemTypes>) {
    const { column, direction } = event
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = ''
      }
    })

    this.tableService.sortColumn = column
    this.tableService.sortDirection = direction
  }
}

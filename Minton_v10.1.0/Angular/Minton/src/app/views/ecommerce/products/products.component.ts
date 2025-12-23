import {
  Component,
  ViewChildren,
  type OnInit,
  type QueryList,
} from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { products, type ProductItemTypes } from '../data'
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common'
import {
  NgbdSortableHeader,
  type SortEvent,
} from '@core/directive/sortable.directive'
import { TableHeaderComponent } from '@component/table/table-header/table-header.component'
import { TableFooterComponent } from '@component/table/table-footer/table-footer.component'
import type { Observable } from 'rxjs'
import { TableService } from '@core/service/table.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PageTitleComponent,
    CommonModule,
    DecimalPipe,
    AsyncPipe,
    NgbdSortableHeader,
    TableHeaderComponent,
    TableFooterComponent,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styles: ``,
})
export class ProductsComponent implements OnInit {
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    { label: 'Products List', path: '/ecommerce/products', active: true },
  ]

  products$: Observable<ProductItemTypes[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<ProductItemTypes>
  >

  constructor(public tableService: TableService<ProductItemTypes>) {
    this.products$ = tableService.items$
    this.total$ = tableService.total$
  }

  ngOnInit(): void {
    this.tableService.setItems(products, 10)
  }

  onSort(event: SortEvent<ProductItemTypes>) {
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

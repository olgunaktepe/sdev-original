import { Component, ViewChildren, type QueryList } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { ticketDetails, type TicketDetailsItems } from './data'
import { StatisticsComponent } from './components/statistics/statistics.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { AsyncPipe, CommonModule } from '@angular/common'
import { TableHeaderComponent } from '@component/table/table-header/table-header.component'
import { TableFooterComponent } from '@component/table/table-footer/table-footer.component'
import { TableService } from '@core/service/table.service'
import {
  NgbdSortableHeader,
  type SortEvent,
} from '@core/directive/sortable.directive'
import type { Observable } from 'rxjs'

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    PageTitleComponent,
    StatisticsComponent,
    NgbDropdownModule,
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    NgbdSortableHeader,
    AsyncPipe,
  ],
  templateUrl: './tickets.component.html',
  styles: ``,
})
export class TicketsComponent {
  breadCrumbItems = [
    { label: 'Apps', path: '/dashboard/sales' },
    { label: 'Tickets', path: '/dashboard/tickets', active: true },
  ]

  ticket$: Observable<TicketDetailsItems[]>
  total$: Observable<number>

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<TicketDetailsItems>
  >

  constructor(public tableService: TableService<TicketDetailsItems>) {
    this.ticket$ = tableService.items$
    this.total$ = tableService.total$
  }

  ngOnInit(): void {
    this.tableService.setItems(ticketDetails, 10)
  }

  onSort(event: SortEvent<TicketDetailsItems>) {
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

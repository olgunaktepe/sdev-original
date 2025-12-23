import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { revenueHistory } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { currency } from '@common/constants'

@Component({
  selector: 'sales-history',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './history.component.html',
  styles: ``,
})
export class HistoryComponent {
  historyList = revenueHistory
  currency = currency
}

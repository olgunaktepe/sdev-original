import { Component } from '@angular/core'
import { performanceDetails } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'crm-performance-details',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './performance-details.component.html',
  styles: ``,
})
export class PerformanceDetailsComponent {
  performanceList = performanceDetails
}

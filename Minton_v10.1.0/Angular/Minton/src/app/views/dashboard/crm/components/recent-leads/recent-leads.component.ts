import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { recentLeads } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'crm-recent-leads',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './recent-leads.component.html',
  styles: ``,
})
export class RecentLeadsComponent {
  leadList = recentLeads
}

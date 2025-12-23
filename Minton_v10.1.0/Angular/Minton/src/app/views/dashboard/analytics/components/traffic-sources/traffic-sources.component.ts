import { Component } from '@angular/core'
import { trafficSources } from '../../data'
import { CommonModule } from '@angular/common'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'analytics-traffic-sources',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './traffic-sources.component.html',
  styles: ``,
})
export class TrafficSourcesComponent {
  trafficList = trafficSources
}

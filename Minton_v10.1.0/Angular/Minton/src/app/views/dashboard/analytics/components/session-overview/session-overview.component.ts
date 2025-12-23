import { Component } from '@angular/core'
import { sessionSummary } from '../../data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { WorldVectorMapComponent } from '@component/vector-maps/world-vector-map.component'
import 'jsvectormap'
import 'jsvectormap/dist/maps/us-merc-en'

@Component({
  selector: 'analytics-session-overview',
  standalone: true,
  imports: [NgbProgressbarModule, WorldVectorMapComponent],
  templateUrl: './session-overview.component.html',
  styles: ``,
})
export class SessionOverviewComponent {
  sessionList = sessionSummary

  usaMapConfig = {
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: '#3bafda',
      },
    },
  }
}

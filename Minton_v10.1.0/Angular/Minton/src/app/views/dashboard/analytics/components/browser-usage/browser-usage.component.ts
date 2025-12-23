import { Component } from '@angular/core'
import { browserUsageData } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'analytics-browser-usage',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './browser-usage.component.html',
  styles: ``,
})
export class BrowserUsageComponent {
  browserList = browserUsageData
}

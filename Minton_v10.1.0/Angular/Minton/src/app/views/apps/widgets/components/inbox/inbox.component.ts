import { Component } from '@angular/core'
import { InboxList } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'widget-inbox',
  standalone: true,
  imports: [SimplebarAngularModule, NgbDropdownModule],
  templateUrl: './inbox.component.html',
  styles: ``,
})
export class InboxComponent {
  inboxList = InboxList
}

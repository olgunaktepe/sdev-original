import { Component } from '@angular/core'
import { channels } from '../../data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'analytics-channels',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './channels.component.html',
  styles: ``,
})
export class ChannelsComponent {
  channelList = channels
}

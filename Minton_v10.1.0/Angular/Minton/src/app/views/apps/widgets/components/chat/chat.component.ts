import { Component } from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { chatMessages } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'widget-chat',
  standalone: true,
  imports: [SimplebarAngularModule, NgbDropdownModule],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {
  messageList = chatMessages
}

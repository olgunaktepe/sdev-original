import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { ChatContactComponent } from './components/chat-contact/chat-contact.component'
import { MessagesComponent } from './components/messages/messages.component'
import type { ChatUser } from './data'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [PageTitleComponent, ChatContactComponent, MessagesComponent],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {
  breadCrumbItems = [
    { label: 'Dashboards', path: '/dashboard/sales' },
    { label: 'Chat', path: '/dashboard/chat', active: true },
  ]

  selectedUser!: ChatUser

  receiveDataFromChild(data: ChatUser) {
    this.selectedUser = data
  }
}

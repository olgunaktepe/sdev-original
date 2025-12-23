import { Component } from '@angular/core'
import { chats } from '@layouts/right-sidebar/data'

@Component({
  selector: 'sidebar-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {
  get favouriteChats() {
    return chats.filter((chat) => chat.group === 'favourites')
  }

  get otherChats() {
    return chats.filter((chat) => chat.group === 'other')
  }
}

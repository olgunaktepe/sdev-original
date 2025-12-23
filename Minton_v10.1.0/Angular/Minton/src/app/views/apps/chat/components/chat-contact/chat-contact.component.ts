import { Component, EventEmitter, Output, type OnInit } from '@angular/core'
import { users, type ChatUser } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'chat-contact',
  standalone: true,
  imports: [SimplebarAngularModule, RouterModule],
  templateUrl: './chat-contact.component.html',
  styles: ``,
})
export class ChatContactComponent implements OnInit {
  @Output() selectedUser = new EventEmitter<ChatUser>()

  contactList = users

  ngOnInit(): void {
    // Fetch Data
    const data = this.contactList[1]
    this.selectedUser.emit(data)
  }

  getDetail(user: ChatUser) {
    const data = user
    this.selectedUser.emit(data)
  }
}

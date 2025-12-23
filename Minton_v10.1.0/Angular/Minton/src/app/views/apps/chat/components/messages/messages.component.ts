import { Component, Input, ViewChild } from '@angular/core'
import { messages, type ChatUser } from '../../data'
import {
  SimplebarAngularModule,
  type SimplebarAngularComponent,
} from 'simplebar-angular'
import { CommonModule } from '@angular/common'
import {
  Validators,
  FormBuilder,
  type FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'chat-messages',
  standalone: true,
  imports: [
    SimplebarAngularModule,
    CommonModule,
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './messages.component.html',
  styles: ``,
})
export class MessagesComponent {
  @Input() selectedUser!: ChatUser
  @ViewChild('scrollRef', { static: false })
  scrollRef!: SimplebarAngularComponent

  toUser: any = {
    id: 9,
    name: 'Nik Patel',
    avatar: 'assets/images/users/avatar-1.jpg',
    email: 'support@coderthemes.com',
    phone: '+1 456 9595 9594',
    location: 'California, USA',
    languages: 'English, German, Spanish',
    groups: 'Work, Friends',
  }

  loading = false
  userMessages: any[] = []
  chatForm: FormGroup
  submitted: boolean = false

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      newMessage: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getMessagesForUser()
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 300
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight
      }, 100)
    }
  }

  getMessagesForUser() {
    if (this.selectedUser) {
      this.loading = true
      setTimeout(() => {
        this.userMessages = this.getMessages(this.selectedUser, this.toUser)
        this.loading = false
        this.onListScroll()
      }, 750)
    }
  }

  get form() {
    return this.chatForm.controls
  }

  sendChatMessage() {
    if (this.chatForm.valid) {
      const newMessage = this.chatForm.get('newMessage')?.value
      this.userMessages.push({
        id: this.userMessages.length + 1,
        from: this.toUser,
        to: this.selectedUser,
        message: { type: 'text', value: newMessage },
        sendOn: new Date().getHours() + ':' + new Date().getMinutes(),
      })
      this.chatForm.reset()
    } else {
      this.submitted = true
    }
    this.onListScroll()
  }

  getMessages(selectedUser: any, toUser: any) {
    return messages.filter(
      (m: any) =>
        (m.to.id === toUser.id && m.from.id === selectedUser.id) ||
        (m.from.id === toUser.id && m.to.id === selectedUser.id)
    )
  }
}

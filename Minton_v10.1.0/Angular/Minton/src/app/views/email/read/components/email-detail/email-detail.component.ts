import { Component } from '@angular/core'
import { credits } from '@common/constants'

type EmailItems = {
  avatar: string
  subject: string
  from_name: string
  from_email: string
  recieved_on: string
  attachments: [
    { id: number; name: string; size: string; ext: string },
    { id: number; name: string; size: string; ext: string },
    { id: number; name: string; size: string; ext: string },
  ]
}

@Component({
  selector: 'email-detail',
  standalone: true,
  imports: [],
  templateUrl: './email-detail.component.html',
  styles: ``,
})
export class EmailDetailComponent {
  credits = credits
  email: EmailItems = {
    avatar: 'assets/images/users/avatar-2.jpg',
    subject: 'Your elite author Graphic Optimization reward is ready!',
    from_name: 'Steven Smith',
    from_email: 'jonathan@domain.com',
    recieved_on: 'Dec 14, 2017, 5:17 AM',
    attachments: [
      { id: 1, name: 'Minton-admin-design.zip', size: '2.3 MB', ext: '.zip' },
      { id: 2, name: 'Dashboard-design.jpg', size: '3.25 MB', ext: '.jpg' },
      { id: 3, name: 'Admin-bug-report.mp4', size: '7.05 MB', ext: '.mp4' },
    ],
  }
}

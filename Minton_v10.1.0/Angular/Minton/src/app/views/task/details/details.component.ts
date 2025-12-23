import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { AttachmentComponent } from './components/attachment/attachment.component'
import { CommentComponent } from './components/comment/comment.component'
import { TaskComponent } from './components/task/task.component'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    PageTitleComponent,
    TaskComponent,
    AttachmentComponent,
    CommentComponent,
  ],
  templateUrl: './details.component.html',
  styles: ``,
})
export class DetailsComponent {
  breadCrumbItems = [
    { label: 'Tasks', path: '/task/list' },
    { label: 'Task Detail', path: '/task/details', active: true },
  ]
}

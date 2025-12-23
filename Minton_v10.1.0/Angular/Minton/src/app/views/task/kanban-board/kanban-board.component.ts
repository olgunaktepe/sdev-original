import { Component, type OnInit } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop'
import { TaskItemComponent } from './components/task-item/task-item.component'
import { tasks, type TaskTypes } from './data'

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbDropdownModule,
    TaskItemComponent,
    CdkDropListGroup, CdkDropList, CdkDrag
  ],
  templateUrl: './kanban-board.component.html',
  styles: ``,
})
export class KanbanBoardComponent implements OnInit {
  breadCrumbItems = [
    { label: 'Tasks', path: '/task/list' },
    { label: 'Kanban Board', path: '/task/kanban-board', active: true },
  ]

  upcomingTasks: TaskTypes[] = []
  inprogressTasks: TaskTypes[] = []
  completedTasks: TaskTypes[] = []
  newTaskDetails: any = null
  totalTasks: number = tasks.length

  constructor() {}

  ngOnInit(): void {
    this.upcomingTasks = tasks.filter((t) => t.status === 'Upcoming')
    this.inprogressTasks = tasks.filter((t) => t.status === 'Inprogress')
    this.completedTasks = tasks.filter((t) => t.status === 'Completed')
  }

  drop(event: CdkDragDrop<TaskTypes[], any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

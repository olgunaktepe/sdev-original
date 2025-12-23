import { Route } from '@angular/router'
import { ListComponent } from './list/list.component'
import { DetailsComponent } from './details/details.component'
import { KanbanBoardComponent } from './kanban-board/kanban-board.component'

export const TASK_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Tasks List' },
  },
  {
    path: 'details',
    component: DetailsComponent,
    data: { title: 'Task Detail' },
  },
  {
    path: 'kanban-board',
    component: KanbanBoardComponent,
    data: { title: 'Kanban Board' },
  },
]

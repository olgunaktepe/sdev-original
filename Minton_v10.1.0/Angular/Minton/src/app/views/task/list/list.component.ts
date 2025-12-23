import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { otherTasks, todayTasks, upcomingTasks } from './data'
import { SectionComponent } from './components/section/section.component'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    PageTitleComponent,
    SectionComponent,
    NgbDropdownModule,
    NgbCollapseModule,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent {
  breadCrumbItems = [
    { label: 'Tasks', path: '/task/list' },
    { label: 'Tasks List', path: '/task/list', active: true },
  ]

  todayTasks = todayTasks
  upcomingTasks = upcomingTasks
  otherTasks = otherTasks

  isCollapsed = false
  isCollapsed1 = false
  isCollapsed2 = false
}

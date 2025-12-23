import { Component } from '@angular/core'
import { tasks } from '@layouts/right-sidebar/data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'sidebar-task',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './task.component.html',
  styles: ``,
})
export class TaskComponent {
  get workingTasks() {
    return tasks.filter((task) => task.stage === 'working')
  }

  get upcomingTasks() {
    return tasks.filter((task) => task.stage === 'upcoming')
  }
}

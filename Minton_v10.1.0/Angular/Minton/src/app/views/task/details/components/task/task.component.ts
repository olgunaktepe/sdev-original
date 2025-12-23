import { Component } from '@angular/core'
import { Tasks } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'detail-task',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './task.component.html',
  styles: ``,
})
export class TaskComponent {
  task = Tasks[0]
}

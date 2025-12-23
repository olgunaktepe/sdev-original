import { Component, Input } from '@angular/core'
import type { TaskTypes } from '../../data'

@Component({
  selector: 'kanban-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class TaskItemComponent {
  @Input() task!: TaskTypes
}

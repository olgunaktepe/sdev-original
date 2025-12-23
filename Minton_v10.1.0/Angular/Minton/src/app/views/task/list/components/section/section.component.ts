import { Component, Input } from '@angular/core'
import type { TaskItemTypes } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'task-section',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './section.component.html',
  styles: ``,
})
export class SectionComponent {
  @Input() task!: TaskItemTypes[]
}

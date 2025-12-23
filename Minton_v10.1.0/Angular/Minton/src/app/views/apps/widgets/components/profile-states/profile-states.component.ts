import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'widget-profile-states',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-states.component.html',
  styles: ``,
})
export class ProfileStatesComponent {
  @Input() avatar: string = ''
  @Input() name: string = ''
  @Input() email: string = ''
  @Input() role: string = ''
  @Input() variant: string = ''
}

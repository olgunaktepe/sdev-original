import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'widget-stat3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat3.component.html',
  styles: ``,
})
export class Stat3Component {
  @Input() variant!: string
  @Input() title!: string
  @Input() icon!: string
  @Input() stats!: string
  @Input() trend!: { value: string; variant: string }
}

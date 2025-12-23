import { Component } from '@angular/core'
import { projectDetails } from '../../data'
import { CommonModule } from '@angular/common'
import { credits } from '@common/constants'

@Component({
  selector: 'profile-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  projects = projectDetails
  credits = credits
}

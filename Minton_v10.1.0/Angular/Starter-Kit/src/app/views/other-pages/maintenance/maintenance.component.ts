import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { credits, currentYear } from '@common/constants'

interface MaintenanceQueryTypes {
  icon: string
  title: string
  desc: string
}

const maintenanceQuery: MaintenanceQueryTypes[] = [
  {
    icon: 'fe-target font-22 text-primary avatar-title',
    title: 'Why is the site down?',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
  },
  {
    icon: 'fe-clock font-22 text-primary avatar-title',
    title: 'What is the downtime?',
    desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical but the majority.',
  },
  {
    icon: 'fe-help-circle font-22 text-primary avatar-title',
    title: 'Do you need support?',
    desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embar.. no-reply@domain.com",
  },
]

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance.component.html',
  styles: ``,
})
export class MaintenanceComponent {
  year = currentYear
  credits = credits
  maintenanceQuery = maintenanceQuery
}

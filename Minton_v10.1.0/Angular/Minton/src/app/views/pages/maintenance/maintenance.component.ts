import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { credits, currentYear } from '@common/constants'
import { maintenanceQuery } from '@views/extra-pages/data'

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

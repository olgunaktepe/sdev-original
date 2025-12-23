import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { credits, currentYear } from '@common/constants'

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error500.component.html',
  styles: ``,
})
export class Error500Component {
  year = currentYear
  credits = credits
}

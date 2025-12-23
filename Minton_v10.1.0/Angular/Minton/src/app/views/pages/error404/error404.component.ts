import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { credits, currentYear } from '@common/constants'

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error404.component.html',
  styles: ``,
})
export class Error404Component {
  year = currentYear
  credits = credits
}

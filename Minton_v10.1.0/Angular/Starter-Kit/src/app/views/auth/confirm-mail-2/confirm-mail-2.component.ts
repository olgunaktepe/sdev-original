import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { credits, currentYear } from '@common/constants'

@Component({
  selector: 'app-confirm-mail-2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirm-mail-2.component.html',
  styles: ``,
})
export class ConfirmMail2Component {
  year = currentYear
  credits = credits
}

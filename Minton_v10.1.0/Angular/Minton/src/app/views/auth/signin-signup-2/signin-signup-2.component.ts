import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { credits, currentYear } from '@common/constants'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-signin-signup-2',
  standalone: true,
  imports: [RouterModule, NgbNavModule],
  templateUrl: './signin-signup-2.component.html',
  styles: ``,
})
export class SigninSignup2Component {
  year = currentYear
  credits = credits
}

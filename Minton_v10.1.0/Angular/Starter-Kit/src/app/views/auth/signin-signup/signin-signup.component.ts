import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { credits, currentYear } from '@common/constants'

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signin-signup.component.html',
  styles: ``,
})
export class SigninSignupComponent {
  year = currentYear
  credits = credits
}

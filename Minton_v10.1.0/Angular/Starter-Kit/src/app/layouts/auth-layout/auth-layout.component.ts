import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { credits, currentYear } from '@common/constants'

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="account-pages mt-5 mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4">
            <router-outlet />
          </div>
        </div>
      </div>
    </div>
    <footer class="footer footer-alt">
      {{ year }} &copy; Minton theme by
      <a href="javascript:void(0);" class="text-dark">{{ credits.name }}</a>
    </footer>
  `,
  styles: ``,
})
export class AuthLayoutComponent {
  year = currentYear
  credits = credits
}

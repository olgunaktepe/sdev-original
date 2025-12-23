import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-logo-box',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="logo-box">
      <a routerLink="/" class="logo logo-dark text-center">
        <span class="logo-sm">
          <img src="assets/images/logo-sm-dark.png" alt="" height="24" />
        </span>
        <span class="logo-lg">
          <img src="assets/images/logo-dark.png" alt="" height="20" />
        </span>
      </a>

      <a routerLink="/" class="logo logo-light text-center">
        <span class="logo-sm">
          <img src="assets/images/logo-sm.png" alt="" height="24" />
        </span>
        <span class="logo-lg">
          <img src="assets/images/logo-light.png" alt="" height="20" />
        </span>
      </a>
    </div>
  `,
  styles: ``,
})
export class LogoBoxComponent {}

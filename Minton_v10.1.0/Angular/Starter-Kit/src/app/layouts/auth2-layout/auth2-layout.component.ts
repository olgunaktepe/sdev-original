import {
  Component,
  inject,
  Renderer2,
  type OnDestroy,
  type OnInit,
} from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-auth2-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="auth-fluid">
      <div class="auth-fluid-right">
        <div class="auth-user-testimonial">
          <h3 class="mb-3 text-white">Very elegant & impressive!</h3>
          <p class="lead fw-normal">
            <i class="mdi mdi-format-quote-open"></i> I've been using this theme
            for a while and I must say that whenever I am looking for a design -
            I refer to this theme for specifics & implementation. With wide
            arrays of components, designs, charts - I would highly recommend
            this theme for anyone using it for dashboard or project management
            usage.. <i class="mdi mdi-format-quote-close"></i>
          </p>
          <h5 class="text-white">- Admin User</h5>
        </div>
        <!-- end auth-user-testimonial-->
      </div>

      <!--Auth fluid left content -->
      <div class="auth-fluid-form-box">
        <div class="align-items-center d-flex h-100">
          <div class="card-body">
            <div class="auth-brand text-center text-lg-start">
              <div class="auth-logo">
                <a routerLink="/" class="logo logo-dark text-center">
                  <span class="logo-lg">
                    <img src="assets/images/logo-dark.png" alt="" height="22" />
                  </span>
                </a>

                <a routerLink="/" class="logo logo-light text-center">
                  <span class="logo-lg">
                    <img
                      src="assets/images/logo-light.png"
                      alt=""
                      height="22"
                    />
                  </span>
                </a>
              </div>
            </div>

            <router-outlet />
          </div>
        </div>
        <!-- end .align-items-center.d-flex.h-100-->
      </div>
      <!-- end auth-fluid-form-box-->
    </div>
  `,
  styles: ``,
})
export class Auth2LayoutComponent implements OnInit, OnDestroy {
  renderer = inject(Renderer2)

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'auth-fluid-pages')
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'auth-fluid-pages')
  }
}

import { Component, inject, Renderer2 } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from '@layouts/footer/footer.component'
import { HorizontalNavComponent } from '@layouts/horizontal-nav/horizontal-nav.component'
import { RightSidebarComponent } from '@layouts/right-sidebar/right-sidebar.component'
import { TopbarComponent } from '@layouts/topbar/topbar.component'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [
    TopbarComponent,
    HorizontalNavComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './horizontal.component.html',
  styles: ``,
})
export class HorizontalComponent {
  layoutType: string = ''

  private store = inject(Store)
  private render = inject(Renderer2)
  private offcanvasService = inject(NgbOffcanvas)

  ngOnInit(): void {}

  onSettingsButtonClicked() {
    this.offcanvasService.open(RightSidebarComponent, { position: 'end' })
  }

  onToggleMobileMenu() {
    document.getElementById('topnav-menu-content')?.classList.toggle('show')
  }
}

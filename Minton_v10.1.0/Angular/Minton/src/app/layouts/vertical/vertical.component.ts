import {
    Component,
    HostListener,
    inject,
    Renderer2,
    type OnInit,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { changemenusize } from '@store/layout/layout-action'
import { getLayoutMenuSize } from '@store/layout/layout-selector'
import { FooterComponent } from '../footer/footer.component'
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { TopbarComponent } from '../topbar/topbar.component'

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './vertical.component.html',
  styles: ``,
  providers: [NgbActiveOffcanvas],
})
export class VerticalComponent implements OnInit {
  private renderer = inject(Renderer2)
  private store = inject(Store)
  private offcanvasService = inject(NgbOffcanvas)
  size = 'default'

  ngOnInit(): void {
    if (document.documentElement.clientWidth <= 1140) {
      this.onResize()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (document.documentElement.clientWidth <= 992) {
      this.size = 'full'
      this.store.dispatch(changemenusize({ menusize: 'full' }))
    } else if (document.documentElement.clientWidth <= 1024) {
      this.store.dispatch(changemenusize({ menusize: 'condensed' }))
      document.getElementById('custom-backdrop')?.classList.add('d-none')
    } else if (document.documentElement.clientWidth >= 1024) {
      this.store.dispatch(changemenusize({ menusize: 'default' }))
      document.getElementById('custom-backdrop')?.classList.add('d-none')
      document.documentElement.classList.remove('sidebar-enable')
    }
    this.store.select(getLayoutMenuSize).subscribe((size: string) => {
      this.renderer.setAttribute(
        document.documentElement,
        'data-sidebar-size',
        size
      )
    })
  }

  onSettingsButtonClicked() {
    this.offcanvasService.open(RightSidebarComponent, {
      position: 'end',
      panelClass: 'right-bar',
    })
  }

  onToggleMobileMenu() {
    const menuSize = document.documentElement.getAttribute('data-sidebar-size')!
    if (document.documentElement.clientWidth >= 767 && menuSize != 'full') {
      if (menuSize == 'condensed') {
        this.store.dispatch(changemenusize({ menusize: 'default' }))
      } else {
        this.store.dispatch(changemenusize({ menusize: 'condensed' }))
      }
    } else {
      document.documentElement.classList.toggle('sidebar-enable')
      document.getElementById('custom-backdrop')?.classList.remove('d-none')
    }

    this.store.select(getLayoutMenuSize).subscribe((size: string) => {
      this.renderer.setAttribute(
        document.documentElement,
        'data-sidebar-size',
        size
      )
    })
  }
}

import { DOCUMENT } from '@angular/common'
import { Component, EventEmitter, Inject, inject, Output } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { changetheme } from '@store/layout/layout-action'
import { getLayoutColor } from '@store/layout/layout-selector'
import { SimplebarAngularModule } from 'simplebar-angular'
import {
  Apps,
  Languages,
  MegaMenuOptions,
  Notifications,
  otherOptions,
  ProfileMenus,
  splitArray,
} from './data'
import { LogoBoxComponent } from '@component/logo-box.component'

type FullScreenTypes = {
  requestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
  webkitExitFullscreen?: () => Promise<void>
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
  msRequestFullscreen?: () => Promise<void>
  mozRequestFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgbDropdownModule, SimplebarAngularModule, LogoBoxComponent],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  @Output() mobileMenuButtonClicked = new EventEmitter()
  @Output() settingButtonClicked = new EventEmitter()

  element!: FullScreenTypes
  notificationList = Notifications
  profileList = ProfileMenus
  newOptions = otherOptions
  megaMenuList = MegaMenuOptions
  languages = Languages

  chunk_size = 3
  appsChunks = splitArray([...Apps], this.chunk_size)

  store = inject(Store)

  constructor(@Inject(DOCUMENT) private document: Document & FullScreenTypes) {
    this.element = this.document.documentElement as FullScreenTypes
  }

  changeTheme() {
    const color = document.documentElement.getAttribute('data-bs-theme')
    if (color == 'light') {
      this.store.dispatch(changetheme({ color: 'dark' }))
    } else {
      this.store.dispatch(changetheme({ color: 'light' }))
    }
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }

  // set Fullscreen
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable')
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen()
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen()
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen()
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen()
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen()
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen()
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen()
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen()
      }
    }
  }

  settingButton() {
    this.settingButtonClicked.emit()
  }

  toggleMobileMenu() {
    document.querySelector('.navbar-toggle')?.classList.toggle('open')
    this.mobileMenuButtonClicked.emit()
  }
}

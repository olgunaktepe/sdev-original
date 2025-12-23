import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  inject,
  Output,
  type SimpleChanges,
} from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { basePath } from '@common/constants'
import { MENU, type MenuItemTypes } from '@common/menu-meta'
import { LogoBoxComponent } from '@component/logo-box.component'
import { findAllParent, findMenuItem } from '@helper/utils'
import {
  NgbCollapseModule,
  NgbDropdownModule,
  type NgbCollapse,
} from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LogoBoxComponent,
    SimplebarAngularModule,
    NgbDropdownModule,
    RouterModule,
    CommonModule,
    NgbCollapseModule,
  ],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  ProfileMenus = [
    {
      label: 'My Account',
      icon: 'fe-user',
      redirectTo: '#',
    },
    {
      label: 'Settings',
      icon: 'fe-settings',
      redirectTo: '#',
    },
    {
      label: 'Lock Screen',
      icon: 'fe-lock',
      redirectTo: '/auth/lock-screen',
    },
    {
      label: 'Logout',
      icon: 'fe-log-out',
      redirectTo: '/auth/logout',
    },
  ]

  menuItems: MenuItemTypes[] = []
  activeMenuItems: string[] | any[] = []
  @Output() toggleMenu: EventEmitter<{ item: MenuItemTypes; status: boolean }> =
    new EventEmitter()

  open: boolean = false

  router = inject(Router)
  store = inject(Store)

  trimmedURL = this.router.url?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  constructor() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.trimmedURL = this.router.url?.replaceAll(
          basePath !== '' ? basePath + '/' : '',
          '/'
        )
        this._activateMenu()
      }
    })
  }

  ngOnInit(): void {
    this.initMenu()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu()
    })
  }

  initMenu(): void {
    this.menuItems = MENU
  }

  hasSubmenu(menu: MenuItemTypes): boolean {
    return menu.children ? true : false
  }

  _activateMenu(): void {
    const div = document.getElementById('side-menu')

    let matchingMenuItem = null
    if (div) {
      let items: any = div.getElementsByClassName('side-nav-link-ref')
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('aria-controls')
        const activeMt = findMenuItem(this.menuItems, mid)

        if (activeMt) {
          const matchingObjs = [
            activeMt['key'],
            ...findAllParent(this.menuItems, activeMt),
          ]

          this.activeMenuItems = matchingObjs
          this.menuItems.forEach((menu: MenuItemTypes) => {
            menu.collapsed = !matchingObjs.includes(menu.key!)
          })
        }
      }
    }

    setTimeout(() => {
      var activatedItem = matchingMenuItem!
      if (activatedItem != null) {
        var simplebarContent = document.querySelector(
          '#leftside-menu-container .simplebar-content-wrapper'
        )
        var offset = activatedItem!.offsetTop - 300
        if (simplebarContent && offset > 100) {
          this.scrollTo(simplebarContent, offset, 600)
        }
      }
    }, 200)
  }

  scrollTo(element: Element, to: number, duration: number): void {
    const start = element.scrollTop
    const change = to - start
    const increment = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increment
      const val = this.easeInOutQuad(currentTime, start, change, duration)
      element.scrollTop = val
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }
    animateScroll()
  }

  easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  toggleMenuItems(menuItem: MenuItemTypes, collapse: NgbCollapse): void {
    collapse.toggle()
    let openMenuItems: any[]
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem['key'],
        ...findAllParent(this.menuItems, menuItem),
      ]
      this.menuItems.forEach((menu: MenuItemTypes) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true
        }
      })
    }
  }

  // Hide Backdrop
  hideBackdrop() {
    document.getElementById('custom-backdrop')?.classList.add('d-none')
    document.documentElement.classList.toggle('sidebar-enable')
  }
}

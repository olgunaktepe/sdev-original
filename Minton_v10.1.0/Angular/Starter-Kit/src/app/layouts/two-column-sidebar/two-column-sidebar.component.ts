import { CommonModule } from '@angular/common'
import { Component, HostListener, inject } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { basePath } from '@common/constants'
import { TWO_COl_MENU_ITEMS, type MenuItemTypes } from '@common/menu-meta'
import { LogoBoxComponent } from '@component/logo-box.component'
import { findAllParent, findMenuItem } from '@helper/utils'
import {
  NgbCollapseModule,
  NgbDropdownModule,
  type NgbCollapse,
} from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { changemenusize } from '@store/layout/layout-action'
import { getLayoutMenuSize } from '@store/layout/layout-selector'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'app-two-column-sidebar',
  standalone: true,
  imports: [
    SimplebarAngularModule,
    SimplebarAngularModule,
    NgbDropdownModule,
    RouterModule,
    CommonModule,
    NgbCollapseModule,
    LogoBoxComponent,
  ],
  templateUrl: './two-column-sidebar.component.html',
  styles: ``,
})
export class TwoColumnSidebarComponent {
  menuItems = TWO_COl_MENU_ITEMS
  activeMenuItems: string[] | any[] = []

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

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu()
    })
  }

  hasSubmenu(menu: MenuItemTypes): boolean {
    return menu.children ? true : false
  }

  _activateMenu(): void {
    const div = document.getElementById('two-col-menu')

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
          const lastElement =
            this.activeMenuItems[this.activeMenuItems.length - 1]
          this.activeMenu = lastElement
          this.menuItems.forEach((menu: MenuItemTypes) => {
            menu.children?.forEach((child) => {
              child.collapsed = !matchingObjs.includes(child.key!)
            })
          })
        }
      }
    }
  }

  activeMenu: string = 'dashboards'

  toggleItem(event: Event, item: any): void {
    event.preventDefault()

    if (!this.hasSubmenu(item)) {
      var menusize = 'condensed'
    } else {
      var menusize = 'default'
      this.activeMenu = item.key
    }

    this.store.dispatch(changemenusize({ menusize }))
    this.store.select(getLayoutMenuSize).subscribe((menusize) => {
      document.documentElement.setAttribute('data-sidebar-size', menusize)
    })
  }

  isActiveMenu(key: string): boolean {
    return this.activeMenu === key
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
        menu.children?.forEach((child) => {
          if (!openMenuItems.includes(child.key!)) {
            child.collapsed = true
          }
        })
      })
    }
  }

  // Hide Backdrop
  hideBackdrop() {
    document.getElementById('custom-backdrop')?.classList.add('d-none')
    document.documentElement.classList.toggle('sidebar-enable')
  }
}

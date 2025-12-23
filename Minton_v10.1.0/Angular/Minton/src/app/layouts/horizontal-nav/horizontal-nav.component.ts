import { CommonModule } from '@angular/common'
import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  type AfterViewInit,
} from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { basePath } from '@common/constants'
import { HORIZONTAL_MENU_ITEMS } from '@common/menu-meta'
import { findAllParent, findMenuItem } from '@helper/utils'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-horizontal-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './horizontal-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalNavComponent implements AfterViewInit {
  menuItems = HORIZONTAL_MENU_ITEMS
  activeMenuItems: string[] = []

  open = false
  showMenu = false
  chunks: any[] = []

  router = inject(Router)

  trimmedURL = this.router.url?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  constructor(private cdr: ChangeDetectorRef) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.trimmedURL = this.router.url?.replaceAll(
          basePath !== '' ? basePath + '/' : '',
          '/'
        )
        this._activateMenu()
        this.cdr.detectChanges()
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu()
    }, 1000)
  }

  _activateMenu(): void {
    const div = document.getElementById('topnav-menu-content')
    let matchingMenuItem = null
    if (div) {
      let items: HTMLCollectionOf<HTMLAnchorElement> =
        div.getElementsByClassName(
          'nav-link-ref'
        ) as HTMLCollectionOf<HTMLAnchorElement>
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key')
        const activeMt = findMenuItem(this.menuItems, mid!)
        if (activeMt) {
          this.activeMenuItems = [
            activeMt['key']!,
            ...findAllParent(this.menuItems, activeMt),
          ]
        }
      }
    }
  }

  isActive(key: any) {
    setTimeout(() => {
      if (this.activeMenuItems.includes(key)) {
        return 'active'
      } else {
        return ''
      }
    }, 1500)
  }

  hasChild(item: any): boolean {
    return (
      item.children &&
      item.children.some((child: any) => child.children?.length)
    )
  }

  // Function to check if an item has no grandchildren and more than 15 children
  hasGrandChild(item: any): boolean {
    return !this.hasChild(item) && item.children?.length >= 15
  }

  splitArray(items: any[], chunkSize: number): any[][] {
    const result = []
    for (let i = 0; i < items.length; i += chunkSize) {
      result.push(items.slice(i, i + chunkSize))
    }
    return result
  }

  getChunks(item: any): any[][] {
    if (this.hasGrandChild(item)) {
      return this.splitArray(item.children, 7) // splitting children into chunks of 7
    }
    return []
  }
}

import { Component, inject, Renderer2, type OnInit } from '@angular/core'
import { credits } from '@common/constants'
import { Store } from '@ngrx/store'
import {
  changelayout,
  changemenucolor,
  changemenusize,
  changeposition,
  changeSidebarUser,
  changetheme,
  changetoparcolor,
  changeWidth,
  resetState,
} from '@store/layout/layout-action'
import {
  getLayoutColor,
  getLayoutMenuColor,
  getLayoutMenuSize,
  getLayoutPosition,
  getLayoutTopbarColor,
  getLayoutWidth,
  getSidebarUser,
} from '@store/layout/layout-selector'

@Component({
  selector: 'sidebar-theme-setting',
  standalone: true,
  imports: [],
  templateUrl: './theme-setting.component.html',
  styles: ``,
})
export class ThemeSettingComponent implements OnInit {
  credits = credits
  store = inject(Store)
  render = inject(Renderer2)

  layout: string = ''
  color: any
  width: string = ''
  position: string = ''
  topbarcolor: string = ''
  menucolor: string = ''
  menusize: string = ''
  user!: boolean

  ngOnInit(): void {
    this.store.select('layout').subscribe((data: any) => {
      this.layout = data.LAYOUT
      this.color = data.LAYOUT_THEME
      this.width = data.LAYOUT_WIDTH
      this.topbarcolor = data.LAYOUT_TOPBAR_COLOR
      this.menucolor = data.LAYOUT_MENU_COLOR
      this.menusize = data.LAYOUT_MENU_SIZE
      this.position = data.LAYOUT_POSITION
      this.user = data.SIDEBAR_USER
    })
  }

  // Change Layout
  changeLayout(layout: string) {
    this.layout = layout
    this.store.dispatch(changelayout({ layout }))
  }

  // change Layout color
  changeLayoutColor(color: any) {
    this.store.dispatch(changetheme({ color }))
    this.store.select(getLayoutColor).subscribe((color) => {
      document.documentElement.setAttribute('data-bs-theme', color)
    })
  }

  // change Layout color
  changeLayoutMode(width: any) {
    this.store.dispatch(changeWidth({ width }))
    this.store.select(getLayoutWidth).subscribe((width) => {
      document.documentElement.setAttribute('data-layout-width', width)
    })
  }

  // change Layout Topbar Color
  changeLayoutTopbarColor(topbarcolor: any) {
    this.store.dispatch(changetoparcolor({ topbarcolor }))
    this.store.select(getLayoutTopbarColor).subscribe((topbarcolor) => {
      document.documentElement.setAttribute('data-topbar-color', topbarcolor)
    })
  }

  // change Layout Menu Color
  changeLayoutMenuColor(menucolor: any) {
    this.store.dispatch(changemenucolor({ menucolor }))
    this.store.select(getLayoutMenuColor).subscribe((menucolor) => {
      document.documentElement.setAttribute('data-menu-color', menucolor)
    })
  }

  // Change Layout Menu size
  changeLayoutMenuSize(menusize: any) {
    this.store.dispatch(changemenusize({ menusize }))
    this.store.select(getLayoutMenuSize).subscribe((menusize) => {
      document.documentElement.setAttribute('data-sidebar-size', menusize)
    })
  }

  // Change Layout Position
  changeLayoutPosition(position: any) {
    this.store.dispatch(changeposition({ position }))
    this.store.select(getLayoutPosition).subscribe((position) => {
      document.documentElement.setAttribute('data-layout-position', position)
    })
  }

  // Show Sidebar User
  changeSidebarUser(event: Event) {
    const user = (event.target as HTMLInputElement).checked
    this.store.dispatch(changeSidebarUser({ user }))
    this.store.select(getSidebarUser).subscribe((user: any) => {
      document.documentElement.setAttribute('data-sidebar-user', user)
    })
  }

  reset() {
    this.store.dispatch(resetState())
  }
}

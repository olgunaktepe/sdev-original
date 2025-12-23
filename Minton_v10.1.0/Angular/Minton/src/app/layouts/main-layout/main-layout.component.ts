import { Component, inject, Renderer2, type OnInit } from '@angular/core'
import { HorizontalComponent } from '@layouts/horizontal/horizontal.component'
import { VerticalComponent } from '@layouts/vertical/vertical.component'
import { Store } from '@ngrx/store'
import { TwoColumnComponent } from '../two-column/two-column.component'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    VerticalComponent,
    HorizontalComponent,
    TwoColumnComponent,
  ],
  templateUrl: './main-layout.component.html',
  styles: ``,
})
export class MainLayoutComponent implements OnInit {
  layoutType: string = ''

  private store = inject(Store)
  private render = inject(Renderer2)

  ngOnInit(): void {
    this.store.select('layout').subscribe((data) => {
      this.layoutType = data.LAYOUT
      const topbarColor =
        this.layoutType == 'two-column' ? 'light' : data.LAYOUT_TOPBAR_COLOR
      this.render.setAttribute(
        document.documentElement,
        'data-layout-mode',
        data.LAYOUT
      )
      this.render.setAttribute(
        document.documentElement,
        'data-bs-theme',
        data.LAYOUT_THEME
      )
      this.render.setAttribute(
        document.documentElement,
        'data-layout-width',
        data.LAYOUT_WIDTH
      )
      this.render.setAttribute(
        document.documentElement,
        'data-menu-color',
        data.LAYOUT_MENU_COLOR
      )
      this.render.setAttribute(
        document.documentElement,
        'data-topbar-color',
        topbarColor
      )
      this.render.setAttribute(
        document.documentElement,
        'data-layout-position',
        data.LAYOUT_POSITION
      )
      this.render.setAttribute(
        document.documentElement,
        'data-sidebar-size',
        data.LAYOUT_MENU_SIZE
      )
      this.render.setAttribute(
        document.documentElement,
        'data-sidebar-user',
        data.SIDEBAR_USER
      )
      if (this.layoutType === 'two-column') {
        this.render.setAttribute(
          document.documentElement,
          'data-two-column-color',
          'brand'
        )
      }
    })
  }

  isVerticalLayoutRequested() {
    return this.layoutType === 'vertical'
  }

  isHorizontalLayoutRequested() {
    return this.layoutType === 'horizontal'
  }

  isTwoColumnLayoutRequested() {
    return this.layoutType === 'two-column'
  }
}

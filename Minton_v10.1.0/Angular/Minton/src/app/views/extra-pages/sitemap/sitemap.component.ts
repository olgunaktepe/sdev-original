import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { sitemap1, sitemap2, sitemap3, type ItemType } from './data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [PageTitleComponent, CommonModule],
  templateUrl: './sitemap.component.html',
  styles: ``,
})
export class SitemapComponent {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/starter' },
    { label: 'Sitemap', path: '/pages/sitemap', active: true },
  ]

  sitemap1 = sitemap1
  sitemap2 = sitemap2
  sitemap3 = sitemap3

  hasChildren(item: ItemType) {
    return item && item.children && item.children.length > 0
  }
}

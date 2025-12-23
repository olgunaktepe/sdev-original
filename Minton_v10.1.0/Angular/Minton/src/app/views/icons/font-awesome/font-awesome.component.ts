import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { FAICONS_LIST } from './data'

@Component({
  selector: 'app-font-awesome',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './font-awesome.component.html',
  styles: ``,
})
export class FontAwesomeComponent {
  breadCrumbItems = [
    { label: 'Icons', path: '/icons/font-awesome' },
    { label: 'Font Awesome', path: '/icons/font-awesome', active: true },
  ]

  getSolidIcons() {
    return FAICONS_LIST.data.filter((icon: any) =>
      icon.attributes.membership.free.includes('solid')
    )
  }

  getRegularIcons() {
    return FAICONS_LIST.data.filter((icon: any) =>
      icon.attributes.membership.free.includes('regular')
    )
  }

  getBrandsIcons() {
    return FAICONS_LIST.data.filter((icon: any) =>
      icon.attributes.membership.free.includes('brands')
    )
  }
}

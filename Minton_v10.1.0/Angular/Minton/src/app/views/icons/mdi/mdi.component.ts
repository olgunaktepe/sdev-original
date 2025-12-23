import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { icons, type MDIIconType } from '../data'

@Component({
  selector: 'app-mdi',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './mdi.component.html',
  styles: ``,
})
export class MdiComponent {
  breadCrumbItems = [
    { label: 'Icons', path: '/icons/mdi' },
    { label: 'Material Design', path: '/icons/mdi', active: true },
  ]

  icons!: MDIIconType[]
  iconsCount = 0
  newIconsCount = 0
  deprecatedIconsCount = 0

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.icons = icons
      /**
       * Blank Icon set
       */
      this.icons.push({ name: 'blank', hex: 'f68c' })
      this.icons.forEach((icon) => {
        var item = this.getIconItem(icon, this.isNew(icon))
        document.getElementById('icons')?.appendChild(item)

        if (this.isNew(icon)) {
          var newItem = this.getIconItem(icon, false)
          document.getElementById('newIcons')?.appendChild(newItem)

          this.newIconsCount++
        }
        if (this.isDeprecated(icon)) {
          var deprecatedItem = this.getIconItem(icon, false)
          document
            .getElementById('deprecatedIcons')
            ?.appendChild(deprecatedItem)
          this.deprecatedIconsCount++
        }
        this.iconsCount++
      })
    }, 300)
  }

  /***
   * Icon Get
   */
  getIconItem(icon: MDIIconType, isNewIcon: boolean) {
    var div = document.createElement('div'),
      i = document.createElement('i')
    div.className = 'col-sm-6 col-md-4 col-lg-3'
    i.className = 'mdi mdi-' + icon.name
    div.appendChild(i)
    var span = document.createElement('span')
    span.appendChild(document.createTextNode('mdi-' + icon.name))
    div.appendChild(span)

    return div
  }

  /***
   * change icon version
   */
  isNew(icon: MDIIconType) {
    return icon.version === '5.8.55'
  }

  isDeprecated(icon: MDIIconType) {
    return typeof icon.deprecated == 'undefined' ? false : icon.deprecated
  }
}

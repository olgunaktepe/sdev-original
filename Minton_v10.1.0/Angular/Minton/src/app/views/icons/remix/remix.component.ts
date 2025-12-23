import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { CommonModule } from '@angular/common'
import { remixicons } from '../data'

@Component({
  selector: 'app-remix',
  standalone: true,
  imports: [PageTitleComponent, CommonModule],
  templateUrl: './remix.component.html',
  styles: ``,
})
export class RemixComponent {
  breadCrumbItems = [
    { label: 'Icons', path: '/icons/remix' },
    { label: 'Remix Icons', path: '/icons/remix', active: true },
  ]

  icons = remixicons

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      var iconData = ''
      /**
       * Blank Icon set
       */
      //  this.icons.push({ name: 'blank', hex: 'f68c' });
      const icons1 = JSON.parse(remixicons)
      Object.keys(icons1).forEach((key) => {
        if (key === 'Editor') {
          iconData =
            iconData +
            '<div class="card"><div class="card-body"><h4 class="card-title">' +
            key +
            ' </h4><p class="card-title-desc mb-2">Use <code>&lt;i class="ri-bold"&gt;&lt;/i&gt;</code><span class="badge bg-success">v 2.4.1</span>.</p><div class="row icons-list-demo">'
          Object.keys(icons1[key]).forEach((k) => {
            iconData +=
              '<div class="col-sm-6 col-md-4 col-lg-3">\
              <i class="ri-' +
              k +
              '"></i> ri-' +
              k +
              '</div>'
          })
        } else {
          iconData =
            iconData +
            '<div class="card"><div class="card-body"><h4 class="card-title">' +
            key +
            ' </h4><p class="card-title-desc mb-2">Use <code>&lt;i class="ri-home-line"&gt;&lt;/i&gt;</code> or <code>&lt;i class="ri-home-fill"&gt;&lt;/i&gt;</code><span class="badge bg-success">v 2.4.1</span>.</p><div class="row icons-list-demo">'
          if (icons1[key]) {
            Object.keys(icons1[key]).forEach((k) => {
              iconData +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                <i class="ri-' +
                k +
                '-line"></i> ri-' +
                k +
                '-line\
            </div><div class="col-xl-3 col-lg-4 col-sm-6">\
                <i class="ri-' +
                k +
                '-fill"></i> ri-' +
                k +
                '-fill\
            </div>'
            })
          }
        }
        iconData += '</div></div></div>'
      })
      const element: HTMLElement = document.getElementById(
        'icons'
      ) as HTMLElement
      element.innerHTML = iconData
    }, 300)
  }
}

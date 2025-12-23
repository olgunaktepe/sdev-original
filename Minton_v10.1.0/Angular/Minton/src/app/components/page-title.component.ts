import { CommonModule } from '@angular/common'
import { Component, inject, Input, type OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

type BreadcrumbItems = {
  label: string
  path: string
  active?: boolean
}

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-12">
        <div
          [ngClass]="{
            'page-title-box': true,
            'page-title-box-alt': isAltLayout(),
          }"
        >
          <h4 class="page-title">{{ title }}</h4>
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Minton</a>
              </li>
              @for (item of breadCrumbItems; track $index) {
                <li class="breadcrumb-item" [class.active]="item.active">
                  @if (item.active) {
                    {{ item.label }}
                  } @else {
                    <a href="javascript: void(0);">{{ item.label }}</a>
                  }
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PageTitleComponent implements OnInit {
  @Input() breadCrumbItems: Array<BreadcrumbItems> = []
  @Input() title: string = ''

  private store = inject(Store)

  layoutType: string = ''

  ngOnInit(): void {
    this.store.select('layout').subscribe((data) => {
      this.layoutType = data.LAYOUT
    })
  }

  isAltLayout() {
    return this.layoutType === 'horizontal'
  }
}

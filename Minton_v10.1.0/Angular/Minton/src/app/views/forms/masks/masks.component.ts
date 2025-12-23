import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'app-masks',
  standalone: true,
  imports: [PageTitleComponent, NgxMaskDirective,],
  templateUrl: './masks.component.html',
  providers: [provideNgxMask()],
})
export class MasksComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/masks' },
    { label: 'Form Masks', path: '/forms/masks', active: true },
  ]
}

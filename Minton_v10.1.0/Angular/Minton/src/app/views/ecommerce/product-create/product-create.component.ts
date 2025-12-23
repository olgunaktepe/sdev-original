import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FileUploaderComponent } from '@component/file-uploader.component'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Select2 } from 'ng-select2-component'
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbNavModule,
    FileUploaderComponent,
    QuillModule,
    CommonModule,
    FormsModule,
    Select2,
  ],
  templateUrl: './product-create.component.html',
  styles: ``,
})
export class ProductCreateComponent {
  content = ''

  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    {
      label: 'Create Product',
      path: '/ecommerce/products-create',
      active: true,
    },
  ]

  editorConfig = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['direction', { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  categories = [
    {
      label: 'Shopping',
      options: [
        { value: 'SH1', label: 'Shopping 1' },
        { value: 'SH2', label: 'Shopping 2' },
        { value: 'SH3', label: 'Shopping 3' },
      ],
    },
    {
      label: 'CRM',
      options: [
        { value: 'CRM1', label: 'Crm 1' },
        { value: 'CRM2', label: 'Crm 2' },
        { value: 'CRM3', label: 'Crm 3' },
        { value: 'CRM4', label: 'Crm 4' },
      ],
    },
    {
      label: 'eCommerce',
      options: [
        { value: 'E1', label: 'eCommerce 1' },
        { value: 'E2', label: 'eCommerce 2' },
        { value: 'E3', label: 'eCommerce 3' },
        { value: 'E4', label: 'eCommerce 4' },
      ],
    },
  ]
}

import { Component } from '@angular/core'
import { FileUploaderComponent } from '@component/file-uploader.component'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-file-uploads',
  standalone: true,
  imports: [PageTitleComponent, FileUploaderComponent],
  templateUrl: './file-uploads.component.html',
  styles: ``,
})
export class FileUploadsComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/file-uploads' },
    { label: 'File Uploads', path: '/forms/file-uploads', active: true },
  ]
}

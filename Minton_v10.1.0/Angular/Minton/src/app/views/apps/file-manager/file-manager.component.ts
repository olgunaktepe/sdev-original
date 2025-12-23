import { Component } from '@angular/core'
import { files } from './data'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './file-manager.component.html',
  styles: ``,
})
export class FileManagerComponent {
  breadCrumbItems = [
    { label: 'Apps', path: '/apps/chat' },
    { label: 'File Manager', path: '/apps/file-manager', active: true },
  ]

  fileList = files
}

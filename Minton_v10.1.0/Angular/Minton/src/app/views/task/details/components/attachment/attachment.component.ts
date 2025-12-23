import { Component } from '@angular/core'
import { FileUploaderComponent } from '@component/file-uploader.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'detail-attachment',
  standalone: true,
  imports: [FileUploaderComponent, NgbDropdownModule],
  templateUrl: './attachment.component.html',
  styles: ``,
})
export class AttachmentComponent {
  files: any

  uploadFiles(data: any) {
    this.files = data
  }

  // File Remove
  removeFile(index: number) {
    this.files.splice(index, 1)
  }
}

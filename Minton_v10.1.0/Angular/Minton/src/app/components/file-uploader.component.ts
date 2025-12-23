import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  DROPZONE_CONFIG,
  DropzoneConfigInterface,
  DropzoneModule,
} from 'ngx-dropzone-wrapper'

type UploadedFile = {
  name: string
  size: number
  type: string
  dataURL?: string
}

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
}

@Component({
  selector: 'FileUploader',
  standalone: true,
  imports: [DropzoneModule],
  template: ` <dropzone
      class="dropzone"
      [config]="dropzoneConfig"
      [message]="dropzone"
      (success)="onUploadSuccess($event)"
    ></dropzone>

    @if (uploadedFiles && showPreview) {
      @for (file of uploadedFiles; track $index) {
        <div class="dropzone-previews mt-3" id="file-previews">
          <div
            class="card mt-1 mb-0 shadow-none border dz-processing dz-success dz-complete dz-image-preview"
          >
            <div class="p-2">
              <div class="row align-items-center">
                <div class="col-auto">
                  <img
                    data-dz-thumbnail=""
                    [src]="file.dataURL"
                    class="avatar-sm rounded bg-light"
                  />
                </div>
                <div class="col ps-0">
                  <a href="javascript:void(0);" class="text-muted fw-bold">{{
                    file.name
                  }}</a>
                  <p class="mb-0" data-dz-size="">
                    <strong>{{ file.size }}</strong> KB
                  </p>
                </div>
                <div class="col-auto">
                  <a
                    role="button"
                    class="btn btn-link btn-lg text-muted"
                    (click)="removeFile($index)"
                  >
                    <i class="fe-x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    }`,
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class FileUploaderComponent {
  @Input() showPreview: boolean = true
  @Output() receiveFiles = new EventEmitter()

  uploadedFiles: UploadedFile[] = []

  dropzoneConfig: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  }

  dropzone = `<div class="dz-message needsclick">
                                                            <div class="mb-3">
                                                                <i class="h1 text-muted ri-upload-cloud-2-line"></i>
                                                            </div>
                                                            <h3>Drop files here or click to upload.</h3>
                                                            <span class="text-muted font-13">(This is just a demo dropzone. Selected files are
                                                                <strong>not</strong> actually uploaded.)</span>
                                                        </div>`

  // File Upload
  imageURL: string = ''
  onUploadSuccess(event: UploadedFile[]) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0])
    }, 0)
    this.receiveFiles.emit(this.uploadedFiles)
  }

  // File Remove
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1)
  }
}

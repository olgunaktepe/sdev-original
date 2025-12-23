import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'app-compose-modal',
  standalone: true,
  imports: [QuillModule, FormsModule],
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="composemodalTitle">New Message</h5>
      <button
        type="button"
        class="btn-close"
        (click)="activeModal.dismiss()"
      ></button>
    </div>
    <div class="modal-body p-3 mb-2">
      <form>
        <div class="mb-2">
          <label for="messageto-input" class="form-label">To</label>
          <input
            type="email"
            class="form-control"
            id="messageto-input"
            placeholder="Example@email.com"
          />
        </div>

        <div class="mb-2">
          <label for="subject-input" class="form-label">Subject</label>
          <input
            type="text"
            class="form-control"
            id="subject-input"
            placeholder="Your subject"
          />
        </div>

        <div class="mb-2">
          <label for="subject-input" class="form-label">Message</label>
          <div id="snow-editor" style="height: 200px;">
            <quill-editor
              id="snow-editor2"
              [(ngModel)]="content"
              name="content"
              #quillEditor
              theme="snow"
              [modules]="editorConfig"
              style="height: 200px"
              class="w-100 mb-3"
            ></quill-editor>
          </div>
          <!-- end Snow-editor-->
        </div>
      </form>
    </div>
    <div class="modal-footer mt-5">
      <button
        type="button"
        class="btn btn-light"
        (click)="activeModal.dismiss()"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary">
        Send <i class="fab fa-telegram-plane ms-1"></i>
      </button>
    </div>
  `,
  styles: ``,
})
export class ComposeModalComponent {
  content = ''
  activeModal = inject(NgbActiveModal)

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
}

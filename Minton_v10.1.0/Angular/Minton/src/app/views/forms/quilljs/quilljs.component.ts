import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PageTitleComponent } from '@component/page-title.component'
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'app-quilljs',
  standalone: true,
  imports: [PageTitleComponent, QuillModule, FormsModule],
  templateUrl: './quilljs.component.html',
  styles: ``,
})
export class QuilljsComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/quilljs' },
    { label: 'Quilljs Editor', path: '/forms/quilljs', active: true },
  ]

  content = ` <h3><span class="ql-size-large">Hello World!</span></h3>
          <p><br></p>
          <h3>This is an simple editable area.</h3>
          <p><br></p>
          <ul>
            <li>
              Select a text to reveal the toolbar.
            </li>
            <li>
              Edit rich document on-the-fly, so elastic!
            </li>
          </ul>
          <p><br></p>
          <p>
            End of simple area
          </p>`

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

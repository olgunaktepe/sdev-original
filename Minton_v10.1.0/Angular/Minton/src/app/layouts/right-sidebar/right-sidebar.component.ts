import { Component, inject } from '@angular/core'
import { NgbActiveOffcanvas, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular'
import { ChatComponent } from './components/chat/chat.component'
import { TaskComponent } from './components/task/task.component'
import { ThemeSettingComponent } from './components/theme-setting/theme-setting.component'

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [
    SimplebarAngularModule,
    NgbNavModule,
    ChatComponent,
    TaskComponent,
    ThemeSettingComponent,
  ],
  templateUrl: './right-sidebar.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class RightSidebarComponent {
  offcanvas = inject(NgbActiveOffcanvas)
}

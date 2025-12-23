import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PageTitleComponent } from '@component/page-title.component'
import { ToastService } from '@core/service/toast-service'
import { NgbAlertModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbToastModule,
    FormsModule,
    NgbAlertModule,
    CommonModule,
  ],
  templateUrl: './notifications.component.html',
  styles: ``,
})
export class NotificationsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/offcanvas' },
    { label: 'Notifications', path: '/ui/offcanvas', active: true },
  ]

  liveToast = false
  show = true
  show1 = true
  show2 = true
  show3 = true
  placement = true
  translucent = true
  toastPlacement: string = ''
  toastService = inject(ToastService)

  showStandard() {
    this.toastService.show({
      content: 'See? Just like this.',
      delay: 10000,
      classname: 'standard',
    })
  }

  showStandard2() {
    this.toastService.show({
      content: 'Heads up, toasts will stack automatically',
      delay: 10000,
      classname: 'standard',
    })
  }

  close() {
    this.show = false
  }

  defaultAlertData = [
    {
      title: 'Primary',
      subtitle: 'This is a primary alert—check it out!',
      variant: 'primary',
    },
    {
      title: 'Secondary',
      subtitle: 'This is a secondary alert—check it out!',
      variant: 'secondary',
    },
    {
      title: 'Success',
      subtitle: 'This is a success alert—check it out!',
      variant: 'success',
    },
    {
      title: 'Error',
      subtitle: 'This is a danger alert—check it out!',
      variant: 'danger',
    },
    {
      title: 'Warning',
      subtitle: 'This is a warning alert—check it out!!',
      variant: 'warning',
    },
    {
      title: 'Info',
      subtitle: 'This is a info alert—check it out!',
      variant: 'info',
      class: 'text-bg-info border-0',
    },
    {
      title: 'Light',
      subtitle: 'This is a light alert—check it out!',
      variant: 'light',
      class: 'text-light border-0',
    },
    {
      title: 'Dark',
      subtitle: 'This is a dark alert—check it out!',
      variant: 'dark',
      class: 'text-bg-dark border-0',
    },
  ]

  closeAlert(id: number) {
    this.defaultAlertData.splice(id, 1)
  }
}

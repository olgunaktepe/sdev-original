import { Component, inject, type TemplateRef } from '@angular/core'
import { RouterLink } from '@angular/router'
import { PageTitleComponent } from '@component/page-title.component'
import {
  NgbAccordionModule,
  NgbModal,
  NgbModalModule,
  type NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [PageTitleComponent, NgbModalModule, NgbAccordionModule, RouterLink],
  templateUrl: './modals.component.html',
  styles: ``,
})
export class ModalsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/modals' },
    { label: 'Modals', path: '/ui/modals', active: true },
  ]

  private modalService = inject(NgbModal)

  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }

  staticBackdrop(content: TemplateRef<any>) {
    this.modalService.open(content, { backdrop: 'static' })
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }
}

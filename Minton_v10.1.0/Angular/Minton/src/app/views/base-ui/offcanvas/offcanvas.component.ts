import { Component, inject, type TemplateRef } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [PageTitleComponent, NgbOffcanvasModule],
  templateUrl: './offcanvas.component.html',
  styles: ``,
})
export class OffcanvasComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/offcanvas' },
    { label: 'Offcanvas', path: '/ui/offcanvas', active: true },
  ]

  private offcanvasService = inject(NgbOffcanvas)

  openStart(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.dismiss()
    this.offcanvasService.open(content, {
      position: 'start',
    })
  }

  openEnd(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { position: 'end' })
  }

  openTop(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { position: 'top' })
  }

  openBottom(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { position: 'bottom' })
  }

  openNoBackdrop(content: TemplateRef<HTMLElement>) {
    this.offcanvasService.open(content, { backdrop: false })
  }

  openScroll(scroll: TemplateRef<any>) {
    this.offcanvasService.open(scroll, { scroll: true })
  }
}

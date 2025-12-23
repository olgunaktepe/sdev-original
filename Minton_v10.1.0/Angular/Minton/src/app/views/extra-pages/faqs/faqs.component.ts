import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { generalFaqs, privacyFaqs, supportFaqs } from '../data'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [PageTitleComponent, NgbNavModule, CommonModule],
  templateUrl: './faqs.component.html',
  styles: ``,
})
export class FaqsComponent {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/faqs' },
    { label: 'FAQs', path: '/pages/faqs', active: true },
  ]

  faqList = generalFaqs
  privacyFaqs = privacyFaqs
  supportFaqs = supportFaqs
}

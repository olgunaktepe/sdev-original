import { Component } from '@angular/core'
import { credits } from '@common/constants'

@Component({
  selector: 'app-billing-template',
  standalone: true,
  imports: [],
  templateUrl: './billing-template.component.html',
  styles: ``,
})
export class BillingTemplateComponent {
  credits = credits
}

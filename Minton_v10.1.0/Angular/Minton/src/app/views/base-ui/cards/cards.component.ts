import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './cards.component.html',
  styles: ``,
})
export class CardsComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/cards' },
    { label: 'Cards', path: '/ui/cards', active: true },
  ]
}

import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-tooltips-popovers',
  standalone: true,
  imports: [PageTitleComponent, NgbPopoverModule, NgbTooltipModule],
  templateUrl: './tooltips-popovers.component.html',
  styles: ``,
})
export class TooltipsPopoversComponent {
  breadCrumbItems = [
    { label: 'Base UI', path: '/ui/tooltips-popovers' },
    {
      label: 'Tooltips & Popovers',
      path: '/ui/tooltips-popovers',
      active: true,
    },
  ]
}

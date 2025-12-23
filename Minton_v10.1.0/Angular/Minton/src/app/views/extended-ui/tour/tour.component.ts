import { Component, type OnDestroy, type OnInit } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import * as hopscotch from 'hopscotch'

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './tour.component.html',
  styles: ``,
})
export class TourComponent implements OnInit, OnDestroy {
  breadCrumbItems = [
    { label: 'Extended UI', path: '/extended/tour' },
    { label: 'Tour', path: '/extended/tour', active: true },
  ]

  tour!: any

  ngOnInit() {
    this.tour = {
      id: 'my-intro',
      steps: [
        {
          target: 'logo-tour',
          title: 'Logo Here',
          content: "You can find here status of user who's currently online.",
          placement: 'bottom',
          yOffset: 10,
        },
        {
          target: 'display-title-tour',
          title: 'Display Text',
          content: 'Click on the button and make sidebar navigation small.',
          placement: 'top',
          zindex: 9999,
        },
        {
          target: 'page-title-tour',
          title: 'User settings',
          content: 'You can edit you profile info here.',
          placement: 'bottom',
          zindex: 999,
        },
        {
          target: 'thankyou-tour',
          title: 'Thank you !',
          content: 'Here you can change theme skins and other features.',
          placement: 'top',
          zindex: 999,
        },
      ],
      showPrevButton: true,
    }

    // Start the tour!
    hopscotch.startTour(this.tour)
  }

  ngOnDestroy(): void {
    hopscotch.endTour(this.tour)
  }
}

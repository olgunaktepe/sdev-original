import { Component } from '@angular/core'
import { socialMediaTraffic } from '../../data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'analytics-social-media-traffic',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './social-media-traffic.component.html',
  styles: ``,
})
export class SocialMediaTrafficComponent {
  socialList = socialMediaTraffic
}

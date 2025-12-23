import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { UserBoxComponent } from './components/user-box/user-box.component'
import { SkillsComponent } from './components/skills/skills.component'
import { AboutComponent } from './components/about/about.component'
import { SettingComponent } from './components/setting/setting.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PageTitleComponent,
    UserBoxComponent,
    SkillsComponent,
    AboutComponent,
    SettingComponent,
    NgbNavModule,
  ],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent {
  breadCrumbItems = [
    { label: 'Contacts', path: '/contacts/list' },
    { label: 'Profile', path: '/contacts/profile', active: true },
  ]
}

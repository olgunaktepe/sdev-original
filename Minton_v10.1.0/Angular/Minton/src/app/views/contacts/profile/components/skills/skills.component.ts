import { Component } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { skills } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'profile-skills',
  standalone: true,
  imports: [NgbProgressbarModule, CommonModule],
  templateUrl: './skills.component.html',
  styles: ``,
})
export class SkillsComponent {
  skillList = skills
}

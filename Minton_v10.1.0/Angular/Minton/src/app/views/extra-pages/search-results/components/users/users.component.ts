import { Component } from '@angular/core'
import { users } from '../../data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'search-users',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent {
  userList = users
}

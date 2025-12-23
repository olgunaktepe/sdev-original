import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'

type TableRecords = {
  id: number
  firstName: string
  lastName: string
  userName: string
  color: string
}

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './basic.component.html',
  styles: ``,
})
export class BasicComponent {
  breadCrumbItems = [
    { label: 'Tables', path: '/tables/basic' },
    { label: 'Basic Tables', path: '/tables/basic', active: true },
  ]

  records: TableRecords[] = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      userName: '@mdo',
      color: 'bg-primary',
    },
    {
      id: 2,
      firstName: 'Jacob',
      lastName: 'Thornton',
      userName: '@fat',
      color: 'bg-success',
    },
    {
      id: 3,
      firstName: 'Larry',
      lastName: 'the Bird',
      userName: '@twitter',
      color: 'bg-pink',
    },
  ]
}

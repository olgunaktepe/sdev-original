import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PageTitleComponent } from '@component/page-title.component'
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbTimepickerModule,
  type NgbDate,
  type NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-pickers',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
  ],
  templateUrl: './pickers.component.html',
  styles: `
    .dp-hidden {
      width: 0;
      margin: 0;
      border: none;
      padding: 0;
    }
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range,
    .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `,
})
export class PickersComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/pickers' },
    { label: 'Form Pickers', path: '/forms/pickers', active: true },
  ]

  model!: NgbDateStruct
  calendar = inject(NgbCalendar)
  formatter = inject(NgbDateParserFormatter)

  selectDate: string = ''

  hoveredDate: NgbDate | null = null
  fromDate: NgbDate | null = this.calendar.getToday()
  toDate: NgbDate | null = this.calendar.getNext(
    this.calendar.getToday(),
    'd',
    10
  )
  time = { hour: 13, minute: 30, second: 0 }

  ngOnInit(): void {
    this.selectDate =
      this.fromDate?.month +
      '/' +
      this.fromDate?.day +
      '/' +
      this.fromDate?.year +
      ' - ' +
      this.toDate?.month +
      '/' +
      this.toDate?.day +
      '/' +
      this.toDate?.year
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    )
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
    this.selectDate =
      this.fromDate.month +
      '/' +
      this.fromDate.day +
      '/' +
      this.fromDate.year +
      ' - ' +
      this.toDate?.month +
      '/' +
      this.toDate?.day +
      '/' +
      this.toDate?.year
  }
}

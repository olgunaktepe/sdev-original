import { CommonModule } from '@angular/common'
import { Component, type OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { emails } from '@views/email/data'

@Component({
  selector: 'email-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './email-list.component.html',
  styles: ``,
})
export class EmailListComponent implements OnInit {
  emails = emails
  page: number = 1
  pageSize: number = 20
  totalEmails: number = 100 // Placeholder for total emails
  startIndex: number = 1
  endIndex: number = this.pageSize
  totalPages: number = Math.ceil(this.totalEmails / this.pageSize)

  ngOnInit(): void {
    this.updateEmailList()
  }

  getNextPage() {
    this.page =
      this.page + 1 > this.totalPages ? this.totalPages : this.page + 1
    this.updateEmailList()
  }

  getPrevPage() {
    this.page = this.page - 1 <= 0 ? 1 : this.page - 1
    this.updateEmailList()
  }

  updateEmailList() {
    const startIdx = (this.page - 1) * this.pageSize
    const endIdx = this.page * this.pageSize
    this.emails = emails.slice(startIdx, endIdx)
    this.startIndex = startIdx + 1
    this.endIndex = endIdx
  }
}

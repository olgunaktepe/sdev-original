import { Component, inject, type OnInit } from '@angular/core'
import { allResults } from '../../data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import {
  DomSanitizer,
  type SafeHtml,
  type SafeResourceUrl,
} from '@angular/platform-browser'

@Component({
  selector: 'search-all-result',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './all-result.component.html',
  styles: ``,
})
export class AllResultComponent implements OnInit {
  resultList = allResults
  public safeResults: any[] = []

  private sanitizer = inject(DomSanitizer)

  ngOnInit() {
    this.safeResults = this.resultList.map((result) => ({
      ...result,
      safeContent: this.sanitizer.bypassSecurityTrustHtml(result.content!),
    }))
  }
}

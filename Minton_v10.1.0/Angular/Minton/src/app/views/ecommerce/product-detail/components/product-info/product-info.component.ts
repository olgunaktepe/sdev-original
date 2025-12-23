import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'product-info',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './product-info.component.html',
  styles: ``,
})
export class ProductInfoComponent {}

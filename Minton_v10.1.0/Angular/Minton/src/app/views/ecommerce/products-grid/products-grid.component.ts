import { Component, type OnDestroy, type OnInit } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { products, type ProductItemTypes } from '../data'
import {
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbRatingModule,
    CommonModule,
    NgbPaginationModule,
    RouterLink,
  ],
  templateUrl: './products-grid.component.html',
  styles: ``,
})
export class ProductsGridComponent implements OnInit {
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    { label: 'Products Grid', path: '/ecommerce/products-grid', active: true },
  ]

  productGrid: ProductItemTypes[] = products

  ngOnInit(): void {}
}

import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap'
import { ProductInfoComponent } from './components/product-info/product-info.component'
import { StockComponent } from './components/stock/stock.component'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbCarouselModule,
    CommonModule,
    ProductInfoComponent,
    StockComponent,
  ],
  templateUrl: './product-detail.component.html',
  styles: ``,
})
export class ProductDetailComponent {
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    {
      label: 'Products Detail',
      path: '/ecommerce/products-detail',
      active: true,
    },
  ]

  activeSlide: number = 0
  slides = [
    {
      img: 'assets/images/products/product-6.png',
      thumb: 'assets/images/products/product-6.png',
    },
    {
      img: 'assets/images/products/product-8.png',
      thumb: 'assets/images/products/product-8.png',
    },
    {
      img: 'assets/images/products/product-1.png',
      thumb: 'assets/images/products/product-1.png',
    },
  ]

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000
    config.wrap = true
    config.keyboard = true
    config.pauseOnHover = true
  }

  ngOnInit() {}

  onSlideChange(event: any) {
    this.activeSlide = event.current
  }
}

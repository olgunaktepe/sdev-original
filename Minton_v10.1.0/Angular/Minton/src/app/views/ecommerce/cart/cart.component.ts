import { Component, type OnInit } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { cartItems } from '../data'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PageTitleComponent, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``,
})
export class CartComponent implements OnInit {
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    {
      label: 'Shopping Cart',
      path: '/ecommerce/cart',
      active: true,
    },
  ]

  cartList = cartItems
  subtotal: number = 0
  totalprice: any

  ngOnInit(): void {
    this.calculatePrice()
  }

  changeQuantity(qty: number, id: string, i: number) {
    if (id == '0' && qty > 1) {
      qty--
    } else if (id == '1') {
      qty++
    }
    this.cartList[i].qty = qty
    this.calculatePrice()
  }

  calculatePrice() {
    this.subtotal = 0
    this.cartList.map((x: any) => {
      x.total = x.qty * x.price
      this.subtotal += parseFloat(x['total'])
    })
    this.subtotal = this.subtotal
    this.totalprice = this.subtotal - 26 + 24 + 18.22
  }
}

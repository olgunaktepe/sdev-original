import { Component } from '@angular/core'
import { currency } from '@common/constants'
import { PageTitleComponent } from '@component/page-title.component'

type OrderItem = {
  id: number
  name: string
  quantity: number
  size: string
  image: string
  price: number
  total: number
}

type ShippingAddress = {
  provider: string
  address: string
  phone: string
  mobile: string
}

type Billing = {
  type: string
  provider: string
  valid: string
}

type Delivery = {
  provider: string
  order_id: string
  payment_mode: string
}

type OrderDetailsType = {
  id: string
  tracking_id: string
  billing_name?: string
  order_status?: string
  order_date: string
  order_time: string
  items: OrderItem[]
  sub_total: number
  shipping_charge: number
  tax: number
  net_total: number
  shipping: ShippingAddress
  billing: Billing
  delivery: Delivery
}

@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './orders-detail.component.html',
  styles: ``,
})
export class OrdersDetailComponent {
  breadCrumbItems = [
    { label: 'eCommerce', path: '/ecommerce/products' },
    { label: 'Order Detail', path: '/ecommerce/orders-detail', active: true },
  ]

  currency = currency
  order: OrderDetailsType = {
    id: '#MN2048',
    tracking_id: '123456789',
    billing_name: 'Charles Wilson',
    order_status: 'Packed',
    order_date: 'Apr 16 2020',
    order_time: '10:24 AM',
    items: [
      {
        id: 1,
        name: 'Blue color T-shirt',
        image: 'assets/images/products/product-1.png',
        size: 'Large',
        quantity: 1,
        price: 41,
        total: 41,
      },
      {
        id: 2,
        name: 'Blue Hoodie for men',
        image: 'assets/images/products/product-6.png',
        size: 'Medium',
        quantity: 2,
        price: 45,
        total: 90,
      },
      {
        id: 3,
        name: 'Full sleeve Pink T-shirt',
        image: 'assets/images/products/product-8.png',
        size: 'Large',
        quantity: 1,
        price: 45,
        total: 45,
      },
    ],
    sub_total: 176,
    shipping_charge: 24,
    tax: 12,
    net_total: 212,
    shipping: {
      provider: 'Arnold Jackson',
      address: '707 Locust View Drive San Francisco, CA 94115',
      phone: '(123) 456-7890 ',
      mobile: '(+01) 12345 67890',
    },
    billing: {
      type: 'Credit Card',
      provider: 'Visa ending in 2851',
      valid: '02/2021',
    },
    delivery: {
      provider: 'UPS Delivery',
      order_id: 'xxxx048',
      payment_mode: 'COD',
    },
  }
}

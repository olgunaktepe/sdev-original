import { Route } from '@angular/router'
import { ProductsComponent } from './products/products.component'
import { ProductsGridComponent } from './products-grid/products-grid.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductCreateComponent } from './product-create/product-create.component'
import { CustomersComponent } from './customers/customers.component'
import { OrdersComponent } from './orders/orders.component'
import { OrdersDetailComponent } from './orders-detail/orders-detail.component'
import { SellersComponent } from './sellers/sellers.component'
import { CartComponent } from './cart/cart.component'
import { CheckoutComponent } from './checkout/checkout.component'

export const ECOMMERCE_ROUTES: Route[] = [
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products List' },
  },
  {
    path: 'products-grid',
    component: ProductsGridComponent,
    data: { title: 'Products Grid' },
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    data: { title: 'Product Detail' },
  },
  {
    path: 'product-create',
    component: ProductCreateComponent,
    data: { title: 'Create Product' },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { title: 'Customers' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'Orders' },
  },
  {
    path: 'orders-detail',
    component: OrdersDetailComponent,
    data: { title: 'Order Detail' },
  },
  {
    path: 'sellers',
    component: SellersComponent,
    data: { title: 'Sellers' },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Checkout' },
  },
]

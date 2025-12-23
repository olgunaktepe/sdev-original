export interface ProductsTypes {
  id: number
  name: string
  price: number
  quantity: number
  amount: number
}

export interface RevenueHistoryTypes {
  id: number
  marketplaces: string
  date: string
  payouts: number
  status: string
  US_tax_hold: number
}

const products: ProductsTypes[] = [
  {
    id: 1,
    name: 'ASOS Ridley High Waist',
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    id: 2,
    name: 'Marco Lightweight Shirt',
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    id: 3,
    name: 'Half Sleeve Shirt',
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    id: 4,
    name: 'Lightweight Jacket',
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    id: 5,
    name: 'Marco Shoes',
    price: 28.49,
    quantity: 69,
    amount: 1965.81,
  },
  {
    id: 6,
    name: 'ASOS Ridley High Waist',
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    id: 7,
    name: 'Half Sleeve Shirt',
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    id: 8,
    name: 'Lightweight Jacket',
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
]

const revenueHistory: RevenueHistoryTypes[] = [
  {
    id: 1,
    marketplaces: 'Themes Market',
    date: 'Oct 15, 2018',
    US_tax_hold: 125.23,
    payouts: 5848.68,
    status: 'Upcoming',
  },
  {
    id: 2,
    marketplaces: 'Freelance',
    date: 'Oct 12, 2018',
    US_tax_hold: 78.03,
    payouts: 1247.25,
    status: 'Paid',
  },
  {
    id: 3,
    marketplaces: 'Share Holding',
    date: 'Oct 10, 2018',
    US_tax_hold: 358.24,
    payouts: 815.89,
    status: 'Paid',
  },
  {
    id: 4,
    marketplaces: "Envato's Affiliates",
    date: 'Oct 03, 2018',
    US_tax_hold: 18.78,
    payouts: 248.75,
    status: 'Overdue',
  },
  {
    id: 5,
    marketplaces: 'Marketing Revenue',
    date: 'Sep 21, 2018',
    US_tax_hold: 185.36,
    payouts: 978.21,
    status: 'Upcoming',
  },
  {
    id: 6,
    marketplaces: 'Advertise Revenue',
    date: 'Sep 15, 2018',
    US_tax_hold: 29.56,
    payouts: 358.1,
    status: 'Paid',
  },
]

export { products, revenueHistory }

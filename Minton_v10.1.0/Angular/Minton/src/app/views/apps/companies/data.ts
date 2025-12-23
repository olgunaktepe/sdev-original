// images
const image1 = 'assets/images/companies/amazon.png'
const image2 = 'assets/images/companies/apple.png'
const image3 = 'assets/images/companies/google.png'
const image4 = 'assets/images/companies/airbnb.png'
const image5 = 'assets/images/companies/facebook.png'
const image6 = 'assets/images/companies/cisco.png'

export interface CompanyTypes {
  id: number
  name: string
  logo: string
  location: string
  revenue: string
  noOfEmployees: string
}

const companyInfo: CompanyTypes[] = [
  {
    id: 1,
    logo: image4,
    name: 'Airbnb Inc.',
    location: 'San Francisco, California',
    revenue: '260 cr',
    noOfEmployees: '3.1k',
  },
  {
    id: 2,
    logo: image2,
    name: 'Apple Inc.',
    location: 'Cupertino, California',
    revenue: '22,923.4 cr',
    noOfEmployees: '47k',
  },
  {
    id: 3,
    logo: image3,
    name: 'Google LLC',
    location: 'Menlo Park, California',
    revenue: '110 bn',
    noOfEmployees: '72k',
  },
  {
    id: 4,
    logo: image1,
    name: 'Amazon Inc.',
    location: 'Seattle, Washington',
    revenue: '17,786 cr',
    noOfEmployees: '566k',
  },
  {
    id: 5,
    logo: image5,
    name: 'Facebook Inc.',
    location: 'Cambridge, Massachusetts',
    revenue: '9.16 bn',
    noOfEmployees: '25.1k',
  },
  {
    id: 6,
    logo: image6,
    name: 'Cisco Systems',
    location: 'San Jose, California',
    revenue: '4,800.5 cr',
    noOfEmployees: '73.4k',
  },
  {
    id: 7,
    logo: image3,
    name: 'Google LLC',
    location: 'Menlo Park, California',
    revenue: '110 bn',
    noOfEmployees: '72k',
  },
  {
    id: 8,
    logo: image2,
    name: 'Apple Inc.',
    location: 'Cupertino, California',
    revenue: '22,923.4 cr',
    noOfEmployees: '47k',
  },
  {
    id: 9,
    logo: image4,
    name: 'Airbnb Inc.',
    location: 'San Francisco, California',
    revenue: '260 cr',
    noOfEmployees: '3.1k',
  },
]

export { companyInfo }

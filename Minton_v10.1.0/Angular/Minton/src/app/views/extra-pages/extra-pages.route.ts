import { Route } from '@angular/router'
import { StarterComponent } from './starter/starter.component'
import { TimelineComponent } from './timeline/timeline.component'
import { SitemapComponent } from './sitemap/sitemap.component'
import { InvoiceComponent } from './invoice/invoice.component'
import { FaqsComponent } from './faqs/faqs.component'
import { SearchResultsComponent } from './search-results/search-results.component'
import { PricingComponent } from './pricing/pricing.component'
import { GalleryComponent } from './gallery/gallery.component'
import { Alt404Component } from '@views/extra-pages/alt404/alt404.component'

export const EXTRA_PAGES_ROUTES: Route[] = [
  {
    path: 'starter',
    component: StarterComponent,
    data: { title: 'Starter' },
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    data: { title: 'Timeline' },
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: { title: 'Sitemap' },
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: { title: 'Invoice' },
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    data: { title: 'FAQs' },
  },
  {
    path: 'search-results',
    component: SearchResultsComponent,
    data: { title: 'Search Results' },
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: { title: 'Pricing' },
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: 'Gallery' },
  },
  {
    path: '404-alt',
    component: Alt404Component,
    data: { title: 'Error Page | 404 | Page not Found' },
  },
]

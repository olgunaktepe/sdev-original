import { Route } from '@angular/router'
import { AvatarsComponent } from './avatars/avatars.component'
import { ButtonsComponent } from './buttons/buttons.component'
import { CardsComponent } from './cards/cards.component'
import { CarouselComponent } from './carousel/carousel.component'
import { DropdownsComponent } from './dropdowns/dropdowns.component'
import { VideoComponent } from './video/video.component'
import { GeneralComponent } from './general/general.component'
import { GridComponent } from './grid/grid.component'
import { ImagesComponent } from './images/images.component'
import { ListGroupComponent } from './list-group/list-group.component'
import { ModalsComponent } from './modals/modals.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { OffcanvasComponent } from './offcanvas/offcanvas.component'
import { PlaceholdersComponent } from './placeholders/placeholders.component'
import { PortletsComponent } from './portlets/portlets.component'
import { ProgressComponent } from './progress/progress.component'
import { RibbonsComponent } from './ribbons/ribbons.component'
import { SpinnersComponent } from './spinners/spinners.component'
import { TabsAccordionsComponent } from './tabs-accordions/tabs-accordions.component'
import { TooltipsPopoversComponent } from './tooltips-popovers/tooltips-popovers.component'
import { TypographyComponent } from './typography/typography.component'

export const UI_ROUTES: Route[] = [
  {
    path: 'avatars',
    component: AvatarsComponent,
    data: { title: 'Avatars' },
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
    data: { title: 'Buttons' },
  },
  {
    path: 'cards',
    component: CardsComponent,
    data: { title: 'Cards' },
  },
  {
    path: 'carousel',
    component: CarouselComponent,
    data: { title: 'Carousel' },
  },
  {
    path: 'dropdowns',
    component: DropdownsComponent,
    data: { title: 'Dropdowns' },
  },
  {
    path: 'video',
    component: VideoComponent,
    data: { title: 'Video' },
  },
  {
    path: 'general',
    component: GeneralComponent,
    data: { title: 'General' },
  },
  {
    path: 'grid',
    component: GridComponent,
    data: { title: 'Grid System' },
  },
  {
    path: 'images',
    component: ImagesComponent,
    data: { title: 'Images' },
  },
  {
    path: 'list-group',
    component: ListGroupComponent,
    data: { title: 'List Group' },
  },
  {
    path: 'modals',
    component: ModalsComponent,
    data: { title: 'Modals' },
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    data: { title: 'Notifications' },
  },
  {
    path: 'offcanvas',
    component: OffcanvasComponent,
    data: { title: 'Offcanvas' },
  },
  {
    path: 'placeholders',
    component: PlaceholdersComponent,
    data: { title: 'Placeholders' },
  },
  {
    path: 'portlets',
    component: PortletsComponent,
    data: { title: 'Portlets' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'ribbons',
    component: RibbonsComponent,
    data: { title: 'Ribbons' },
  },
  {
    path: 'spinners',
    component: SpinnersComponent,
    data: { title: 'Spinners' },
  },
  {
    path: 'tabs-accordions',
    component: TabsAccordionsComponent,
    data: { title: 'Tabs Accordions' },
  },
  {
    path: 'tooltips-popovers',
    component: TooltipsPopoversComponent,
    data: { title: 'Tooltips & Popovers' },
  },
  {
    path: 'typography',
    component: TypographyComponent,
    data: { title: 'Typography' },
  },
]

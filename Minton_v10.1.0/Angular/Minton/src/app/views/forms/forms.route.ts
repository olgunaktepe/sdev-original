import { Route } from '@angular/router'
import { ElementsComponent } from './elements/elements.component'
import { AdvancedComponent } from './advanced/advanced.component'
import { ValidationComponent } from './validation/validation.component'
import { PickersComponent } from './pickers/pickers.component'
import { WizardComponent } from './wizard/wizard.component'
import { MasksComponent } from './masks/masks.component'
import { QuilljsComponent } from './quilljs/quilljs.component'
import { FileUploadsComponent } from './file-uploads/file-uploads.component'

export const FORMS_ROUTES: Route[] = [
  {
    path: 'elements',
    component: ElementsComponent,
    data: { title: 'Form Elements' },
  },
  {
    path: 'advanced',
    component: AdvancedComponent,
    data: { title: 'Form Advanced' },
  },
  {
    path: 'validation',
    component: ValidationComponent,
    data: { title: 'Form Validation' },
  },
  {
    path: 'pickers',
    component: PickersComponent,
    data: { title: 'Form Pickers' },
  },
  {
    path: 'wizard',
    component: WizardComponent,
    data: { title: 'Form Wizard' },
  },
  {
    path: 'masks',
    component: MasksComponent,
    data: { title: 'Form Masks' },
  },
  {
    path: 'quilljs',
    component: QuilljsComponent,
    data: { title: 'Quilljs Editor' },
  },
  {
    path: 'file-uploads',
    component: FileUploadsComponent,
    data: { title: 'File Uploads' },
  },
]

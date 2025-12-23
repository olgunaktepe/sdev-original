import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { PageTitleComponent } from '@component/page-title.component'
import { NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbProgressbarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
  ],
  templateUrl: './wizard.component.html',
  styles: ``,
})
export class WizardComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/wizard' },
    { label: 'Form Wizard', path: '/forms/wizard', active: true },
  ]

  activeWizard1: number = 1
  activeWizard2: number = 1
  activeWizard3: number = 1
  activeWizard4: number = 1

  basicWizardForm!: UntypedFormGroup

  btnWizardForm!: UntypedFormGroup

  progressWizardForm!: UntypedFormGroup

  accountForm!: UntypedFormGroup

  profileForm!: UntypedFormGroup

  validationWizardForm!: UntypedFormGroup

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    // initialize forms
    this.basicWizardForm = this.fb.group({
      account: this.fb.group({
        userName: ['hyper'],
        password: ['123456'],
        rePassword: ['123456'],
      }),
      profile: this.fb.group({
        firstName: ['Francis'],
        lastName: ['Brinkman'],
        email: ['cory1979@hotmail.com', Validators.email],
      }),
      acceptTerms: [false, Validators.requiredTrue],
    })

    this.btnWizardForm = this.fb.group({
      account: this.fb.group({
        userName: ['hyper'],
        password: ['123456'],
        rePassword: ['123456'],
      }),
      profile: this.fb.group({
        firstName: ['Francis'],
        lastName: ['Brinkman'],
        email: ['cory1979@hotmail.com', Validators.email],
      }),
      acceptTerms: [false, Validators.requiredTrue],
    })

    this.progressWizardForm = this.fb.group({
      account: this.fb.group({
        userName: ['hyper'],
        password: ['123456'],
        rePassword: ['123456'],
      }),
      profile: this.fb.group({
        firstName: ['Francis'],
        lastName: ['Brinkman'],
        email: ['cory1979@hotmail.com', Validators.email],
      }),
      acceptTerms: [false, Validators.requiredTrue],
    })

    this.accountForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
    })

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })

    this.validationWizardForm = this.fb.group({
      acceptTerms: [false, Validators.requiredTrue],
    })
  }

  // convenience getter for easy access to form fields
  get form1() {
    return this.accountForm.controls
  }
  get form2() {
    return this.profileForm.controls
  }
  get form3() {
    return this.validationWizardForm.controls
  }

  // goes to next wizard
  gotoNext(): void {
    if (this.accountForm.valid) {
      if (this.profileForm.valid) {
        this.activeWizard4 = 3
      } else {
        this.activeWizard4 = 2
      }
    }
  }
}

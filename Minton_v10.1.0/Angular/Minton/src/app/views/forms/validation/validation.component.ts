import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type AbstractControl,
  type FormGroup,
  type UntypedFormGroup,
  type ValidationErrors,
} from '@angular/forms'
import { PageTitleComponent } from '@component/page-title.component'

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [PageTitleComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './validation.component.html',
  styles: ``,
})
export class ValidationComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/validation' },
    { label: 'Form Validation', path: '/forms/validation', active: true },
  ]

  validationform!: UntypedFormGroup
  tooltipvalidationform!: UntypedFormGroup
  basicForm!: UntypedFormGroup
  horizontalForm!: UntypedFormGroup
  validationForm!: FormGroup
  rangeValidationForm!: FormGroup
  submit!: boolean
  formsubmit!: boolean
  cuSubmit!: boolean
  hSubmit!: boolean
  tSubmit!: boolean

  public formBuilder = inject(UntypedFormBuilder)

  ngOnInit(): void {
    this.validationform = this.formBuilder.group({
      firstName: [
        'Mark',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: [
        'Otto',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      terms: ['', [Validators.required]],
    })

    this.tooltipvalidationform = this.formBuilder.group({
      firstName: [
        'Mark',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      lastName: [
        'Otto',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
      ],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    })

    this.basicForm = this.formBuilder.group(
      {
        userName: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
        ],
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        password: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
        ],
        confirmpwd: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
        ],
      },
      { validators: this.validateAreEqual }
    )

    this.horizontalForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        password: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
        ],
        confirmpwd: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
        ],
        url: ['', [Validators.required]],
      },
      { validators: this.validateAreEqual }
    )

    this.validationForm = this.formBuilder.group(
      {
        requiredInput: ['', Validators.required],
        equalTo1: ['', Validators.required],
        equalTo2: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        url: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(http|https):\/\/[^\s$.?#].[^\s]*$/gm),
          ],
        ],
        digits: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        numberInput: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        alphaNumeric: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
        textAreaInput: ['', Validators.required],
      },
      { validator: this.mustMatch('equalTo1', 'equalTo2') }
    )

    this.rangeValidationForm = this.formBuilder.group({
      minLenInput: ['', [Validators.required, Validators.minLength(6)]],
      maxLenInput: ['', [Validators.required, Validators.maxLength(6)]],
      rangeLenInput: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      minValueInput: ['', [Validators.required, Validators.min(6)]],
      maxValueInput: ['', [Validators.required, Validators.max(6)]],
      rangeValueInput: [
        '',
        [Validators.required, Validators.min(6), Validators.max(100)],
      ],
      regEx: [
        '',
        [
          Validators.required,
          Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        ],
      ],
    })
  }

  get form() {
    return this.validationform.controls
  }

  get formData() {
    return this.tooltipvalidationform.controls
  }

  get basicData() {
    return this.basicForm.controls
  }

  get horizontalData() {
    return this.horizontalForm.controls
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirmpwd ? null : { notSame: true }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
      return null
    }
  }

  validSubmit() {
    this.submit = true
  }

  formSubmit() {
    this.formsubmit = true
  }

  basicSubmit() {
    this.cuSubmit = true
  }

  horizontalSubmit() {
    this.hSubmit = true
  }

  onSubmit() {
    if (this.rangeValidationForm.valid) {
    } else {
      this.rangeValidationForm.markAllAsTouched() // Ensures all errors are shown after submit attempt
    }
  }

  onTypeSubmit() {
    if (this.validationForm.valid) {
    } else {
      this.validationForm.markAllAsTouched() // Mark all controls as touched to show validation errors
    }
  }
}

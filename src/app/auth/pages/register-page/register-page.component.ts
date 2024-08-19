import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';
// import * as customValidators from '../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  // public myForm: FormGroup = this.fb.group({
  //   name: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern(customValidators.firstNameAndLastnamePattern),
  //     ],
  //   ],
  //   email: [
  //     '',
  //     [Validators.required, Validators.pattern(customValidators.emailPattern)],
  //   ],
  //   userName: ['', [Validators.required, customValidators.cantBeStrider]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   passwordConfirmation: ['', [Validators.required]],
  // });

  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.firstNameAndLastnamePattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
      // [EmailValidatorService],
      [this.emailValidator],
    ],
    userName: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'passwordConfirmation')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}

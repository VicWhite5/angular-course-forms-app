import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   stock: new FormControl(0)
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.myForm.reset({name: 'TRX', price: 10, stock: 10});
  }

  // get productNameErrorMsg(): string {}

  isValidField(field: string): boolean {
    const valid: boolean = true;
    if ( this.myForm.controls[field].errors && this.myForm.controls[field].touched) return false;
    return valid;
    
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campos es requerido';
        case 'minlength':
          return `Este campo necesita mínimo ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return 'The minimum value is 0';
        default:
          return 'Unknown error';
      }
    }

    return '';
  }

  onSave(): void {
    // console.log(this.myForm.valid);
    // console.log(this.myForm.value);
    //  this.myForm.reset();

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({ price: 0, stock: 0 });
  }
}

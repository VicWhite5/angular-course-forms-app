import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit{


  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });


  public person = {
    gender: 'F',
    wantNotifications: false
  }
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField(field: string): boolean {
    const valid: boolean = true;
    if (
      this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
    )
      return false;
    return valid;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...restData} = this.myForm.value;
    
    this.person = restData;
    console.log(this.myForm.value);
    console.log(this.person);
    
    
  }
}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder){}

  get favoriteGames(){
    // console.log("Hola",this.myForm.get('name'));
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean {
    const valid: boolean = true;
    if ( this.myForm.controls[field].errors && this.myForm.controls[field].touched) return false;
    return valid;
    
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean{
    if ( formArray.controls[index].errors && formArray.controls[index].touched) return false;
    return true;
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

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onAddFavorite(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push( this.fb.control(newGame, Validators.required) );
    this.newFavorite.reset();
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
    
  }
}

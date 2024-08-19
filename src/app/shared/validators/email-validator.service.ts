import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log(email);

  //   return of({
  //     emailTaken: true,
  //   }).pipe(delay(2000));
  // }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        //Para simular que existe
        if (email === 'vic@gmail.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
        }
        //Lo que la persona acaba de introducir, no está tomado, no existe
        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(
      delay(3000)
    );

    return httpCallObservable;
    // Nosotros hariamos algo así
    // return this.hhtp.get<string>(`https://miservicio.com`).pipe(...)
  }

  
}

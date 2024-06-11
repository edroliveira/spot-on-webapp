import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openAlert(type: AlertTypeEnum) {
    this._snackBar.open('Preencha os campos obrigatórios', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [type]
    });
  }

}

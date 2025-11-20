import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertTypeEnum } from '../../app/shared/model/enum/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openAlert(type: AlertTypeEnum) {
    this.snackBar.open('Preencha os campos obrigatórios', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000000,
      panelClass: [type]
    });
  }

}

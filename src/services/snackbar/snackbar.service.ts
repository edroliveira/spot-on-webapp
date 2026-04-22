import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertTypeEnum } from '../../app/shared/model/enum/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openAlert(type: AlertTypeEnum, msg: string) {
    this.snackBar.open(msg, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [type]
    });
  }

}

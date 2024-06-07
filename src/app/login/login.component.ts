import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  hidePassword = true;

  loginForm = new FormGroup({
    codigoEmpresa: new FormControl({ value: '', disabled: false }, Validators.required),
    usuario: new FormControl({ value: '', disabled: false }, Validators.required),
    senha: new FormControl({ value: '', disabled: false }, Validators.required)
  });

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  onClickSignUp() {
    this._router.navigate(['/signup']);
  }

  onSubmitLogin() {
    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      this.openAlert();
    }
  }

  openAlert() {
    this._snackBar.open('Preencha os campos obrigatórios', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['panel-error']
    });
  }

}

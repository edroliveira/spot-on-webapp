import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';

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
    private _snackbarService: SnackbarService,
    private _router: Router
  ) { }

  onClickSignUp() {
    this._router.navigate(['/signup']);
  }

  onSubmitLogin() {
    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      this._snackbarService.openAlert(AlertTypeEnum.ERROR);
    }
  }

}

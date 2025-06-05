import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';
import { AuthGoogleService } from '../../services/auth-google.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [AuthGoogleService],
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
    private authGoogleService: AuthGoogleService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  onClickSignUp() {
    this.router.navigate(['/signup']);
  }

  onSubmitLogin() {
    if (!this.loginForm.valid) {
      this.snackbarService.openAlert(AlertTypeEnum.ERROR);
    }
  }

  signInWithGoogle() {
    this.authGoogleService.login();
  }

}

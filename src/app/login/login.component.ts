import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';
import { AuthGoogleService } from '../../services/auth-google.service';
import { LoadingComponent } from '../loading/loading.component';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoadingComponent
  ],
  providers: [AuthGoogleService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  showLoading = false;
  hidePassword = true;
  isFirstAccess = false;

  loginForm = new FormGroup({
    codigoEmpresa: new FormControl({ value: '', disabled: false }, Validators.required),
    usuario: new FormControl({ value: '', disabled: false }, Validators.required),
    senha: new FormControl({ value: '', disabled: false }, Validators.required)
  });

  constructor(
    private authGoogleService: AuthGoogleService,
    private snackbarService: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const isFirstAccess = this.activatedRoute.snapshot.queryParamMap.get('isFirstAccess') === 'true';
    this.isFirstAccess = isFirstAccess;
  }

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

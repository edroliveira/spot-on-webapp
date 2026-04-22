import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Store } from '@ngxs/store';
import { distinctUntilChanged, exhaustMap, filter, finalize, map, Observable, switchMap } from 'rxjs';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { AsyncPipe } from '@angular/common';
import { AuthGoogleService } from '../../services/auth-google.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../shared/model/confirmation-dialog-data';
import { SetToggleSidenav } from '../../action/sidenav-action';
import { SidenavState } from '../../state/sidenav-state';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';
import { SetUser } from '../../action/user-action';
import { UserState } from '../../state/user-state';

@Component({
  standalone: true,
  selector: 'app-header',
  providers: [AuthGoogleService],
  imports: [
    SharedModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentGoogleUser$: Observable<GoogleUserData | null> = this.store.select(GoogleUserState.getCurrentUser)
    .pipe(distinctUntilChanged());
  currentUser$: Observable<User | null> = this.store.select(UserState.getCurrentUser)
    .pipe(distinctUntilChanged());
  toggleSidenav$: Observable<boolean> = this.store.select(SidenavState.getToggleSidenav)
    .pipe(distinctUntilChanged());
  toggleSidenav: boolean = false;
  dialog = inject(MatDialog);
  
  constructor(
    private store: Store,
    private authGoogleService: AuthGoogleService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.handleToggleSidenav();
  }

  private isProcessingUser = false;

  ngOnInit(): void {
    this.verifyAndCreateUser();
  }

  private verifyAndCreateUser(): void {
    this.currentGoogleUser$.pipe(
      filter(googleUser => !!googleUser?.email && !this.isProcessingUser),

      switchMap(googleUser => {
        this.isProcessingUser = true;
        return this.userService.getUserByEmail(googleUser!.email).pipe(
          map(user => ({ googleUser, user }))
        );
      })
    ).subscribe({
      next: ({ googleUser, user }) => {
        if (!user && googleUser) {
          const newUser: User = {
            id: null,
            name: googleUser.name,
            email: googleUser.email,
            registerType: 'GOOGLE'
          };

          this.userService.createUser(newUser).pipe(
            finalize(() => this.isProcessingUser = false)
          ).subscribe(createdUser => {
            console.log('User created successfully:', createdUser);
            this.snackbarService.openAlert(AlertTypeEnum.SUCCESS, 'Usuário criado com sucesso!');
            this.store.dispatch(new SetUser(createdUser));
          });
        } else {
          this.store.dispatch(new SetUser(user));
          this.isProcessingUser = false;
        }
      },
      error: (err) => {
        console.error('Erro no fluxo de autenticação:', err);
        this.isProcessingUser = false;
      }
    });
  }

  handleToggleSidenav() {
    this.toggleSidenav$.subscribe((toggleSidenav) => {
      this.toggleSidenav = toggleSidenav;
    });
  }

  onToggleSidenav() {
    this.store.dispatch(new SetToggleSidenav(!this.toggleSidenav));
  }

  onClickLogout() {
    this.authGoogleService.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: new ConfirmationDialogData(
        'Confirmar logout',
        'Tem certeza que deseja sair?',
        'Sim',
        'Não',
      ),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authGoogleService.logout();
      }
    });
  }

}

import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Store } from '@ngxs/store';
import { distinctUntilChanged, Observable } from 'rxjs';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { AsyncPipe } from '@angular/common';
import { AuthGoogleService } from '../../services/auth-google.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../shared/model/confirmation-dialog-data';
import { SetToggleSidenav } from '../../action/sidenav-action';
import { SidenavState } from '../../state/sidenav-state';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [AuthGoogleService],
  imports: [
    SharedModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser$: Observable<GoogleUserData | null> = this.store.select(GoogleUserState.getCurrentUser);
  toggleSidenav$: Observable<boolean> = this.store.select(SidenavState.getToggleSidenav)
      .pipe(distinctUntilChanged());
  toggleSidenav: boolean = false;
  dialog = inject(MatDialog);
  
  constructor(
    private store: Store,
    private authGoogleService: AuthGoogleService
  ) {
    this.handleToggleSidenav();
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

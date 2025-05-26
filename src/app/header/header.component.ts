import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { AsyncPipe } from '@angular/common';
import { AuthGoogleService } from '../../services/auth-google.service';

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
  
  constructor(
    private store: Store,
    private authGoogleService: AuthGoogleService
  ) { }

  onClickLogout() {
    this.authGoogleService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { select, Store } from '@ngxs/store';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [AuthGoogleService],
  imports: [
    AsyncPipe,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<GoogleUserData | null> = this.store.select(GoogleUserState.getCurrentUser);

  constructor(
    private store: Store,
    private authGoogleService: AuthGoogleService
  ) { }

  ngOnInit(): void {

  }
}

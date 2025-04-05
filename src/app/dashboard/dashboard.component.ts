import { Component, OnInit, WritableSignal } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { select, Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [AuthGoogleService],
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<GoogleUserData | null> = this.store.select(GoogleUserState.getCurrentUser);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {

  }
}

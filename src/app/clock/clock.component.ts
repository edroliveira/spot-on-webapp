import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, map, Observable, share, Subscription, timer } from 'rxjs';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { ClockService } from '../../services/clock/clock.service';
import { TimeLocationRecord } from '../../models/register-time-location';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';
import { Store } from '@ngxs/store';
import { UserState } from '../../state/user-state';
import { User } from '../../models/user';
import { SetRecords } from '../../action/record.action';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-clock',
  imports: [
    DatePipe,
    MatRippleModule,
    MatProgressSpinnerModule
  ],
  providers: [GeolocationService],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit {
  currentUser$: Observable<User | null> = this.store.select(UserState.getCurrentUser)
    .pipe(distinctUntilChanged());
  currentUser!: User;
  currentTime = new Date();
  currentTimeSubscription!: Subscription
  disableClockInButton = false;
  progressSpinnerMode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    private geolocationService: GeolocationService,
    private clockService: ClockService,
    private snackbarService: SnackbarService,
    private store: Store
  ) { }

  ngOnInit() {
    this.getCurrentTime();
    this.getCurrentUser();
  }

  private getCurrentTime() {
    this.currentTimeSubscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.currentTime = time;
      });
  }

  private getCurrentUser() {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.getRecords();
      }
    });
  }

  private getRecords() {
    this.clockService.findRecordsByDate(this.currentUser.id!, new Date()).subscribe(records => {
      this.store.dispatch(new SetRecords(records));
    });
  }

  registerTime() {
    this.disableClockInButton = true;
    this.geolocationService.getPosition().subscribe(resp => {
      const timeLocationRecord: TimeLocationRecord = {
        userId: this.currentUser.id!,
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
        dateTime: new Date()
      }

      this.clockService.clockIn(timeLocationRecord).subscribe({
        next: () => {
          this.snackbarService.openAlert(AlertTypeEnum.SUCCESS, 'Ponto registrado com sucesso!');
          this.getRecords();
        },
        error: (error) => {
          console.error('Error registering time:', error);
          this.snackbarService.openAlert(AlertTypeEnum.ERROR, 'Erro ao registrar ponto. Tente novamente.');
        },
        complete: () => this.disableClockInButton = false
      });
    });
  }

}

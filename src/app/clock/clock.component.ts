import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, map, Observable, share, Subscription, timer } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { ClockService } from '../../services/clock/clock.service';
import { RegisterTimeLocation } from '../../models/register-time-location';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AlertTypeEnum } from '../shared/model/enum/alert-type.enum';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { Store } from '@ngxs/store';
import { UserState } from '../../state/user-state';
import { User } from '../../models/user';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [
    DatePipe,
    SharedModule
  ],
  providers: [ GeolocationService ],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit {
  currentUser$: Observable<User | null> = this.store.select(UserState.getCurrentUser)
      .pipe(distinctUntilChanged());
  currentUser!: User;
  currentTime = new Date();
  currentTimeSubscription!: Subscription

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
      console.log('Records found:', records);
    });
  }

  registerTime() {
    this.geolocationService.getPosition().subscribe(resp => {
      console.log('Geolocation response:', resp);
      const registerTimeLocation: RegisterTimeLocation = {
        userId: this.currentUser.id!,
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
        dateTime: new Date()
      }

      this.clockService.clockIn(registerTimeLocation).subscribe({
        next: () => {
          this.snackbarService.openAlert(AlertTypeEnum.SUCCESS, 'Ponto registrado com sucesso!');
          this.getRecords();
        },
        error: (error) => {
          console.error('Error registering time:', error);
          this.snackbarService.openAlert(AlertTypeEnum.ERROR, 'Erro ao registrar ponto. Tente novamente.');
        }
      });
    });
  }

}

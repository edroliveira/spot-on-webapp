import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserState } from '../../state/user-state';
import { Store } from '@ngxs/store';
import { ClockService } from '../../services/clock/clock.service';
import { RegisterTimeLocation } from '../../models/register-time-location';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-daily-feed-panel',
    imports: [SharedModule, DatePipe],
    templateUrl: './daily-feed-panel.component.html',
    styleUrl: './daily-feed-panel.component.scss'
})
export class DailyFeedPanelComponent implements OnInit {
    currentUser$: Observable<User | null> = this.store.select(UserState.getCurrentUser)
        .pipe(distinctUntilChanged());
    currentUser!: User;
    records: RegisterTimeLocation[] = [];
    displayedColumns: string[] = ['dateTime'];

    constructor(
        private store: Store,
        private clockService: ClockService
    ) { }

    ngOnInit(): void {
        this.getCurrentUser();
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
            this.records = records;
        });
    }

}

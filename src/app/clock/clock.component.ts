import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit {
  currentTime = new Date();
  currentTimeSubscription!: Subscription

  ngOnInit() {
    this.currentTimeSubscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.currentTime = time;
      });
  }
}

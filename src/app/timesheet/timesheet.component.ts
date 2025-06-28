import { Component } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';
import { MessagePanelComponent } from '../message-panel/message-panel.component';
import { DailyFeedPanelComponent } from '../daily-feed-panel/daily-feed-panel.component';

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [
    ClockComponent,
    MessagePanelComponent,
    DailyFeedPanelComponent
  ],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent {

}

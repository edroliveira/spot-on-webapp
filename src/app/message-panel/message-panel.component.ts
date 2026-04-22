import { Component, Input } from '@angular/core';
import { MatRipple } from "@angular/material/core";

@Component({
  selector: 'app-message-panel',
  standalone: true,
  imports: [MatRipple],
  templateUrl: './message-panel.component.html',
  styleUrl: './message-panel.component.scss'
})
export class MessagePanelComponent {

  @Input() panelTitle: string = '';

}

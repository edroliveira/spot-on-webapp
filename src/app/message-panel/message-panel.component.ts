import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-panel',
  standalone: true,
  imports: [],
  templateUrl: './message-panel.component.html',
  styleUrl: './message-panel.component.scss'
})
export class MessagePanelComponent {

  @Input() panelTitle: string = '';

}

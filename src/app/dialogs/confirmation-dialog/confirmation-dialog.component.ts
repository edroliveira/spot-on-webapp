import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { ConfirmationDialogData } from '../../shared/model/confirmation-dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  readonly data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

}

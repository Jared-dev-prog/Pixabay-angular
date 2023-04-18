import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  messageError: string = '';
  showError: boolean = false;

  constructor(private _imageService: ImageService) {
    this._imageService.getError().subscribe({
      next: (data) => {
        this.messageError = data;
        this.showError = true;
        this.timeShowError();
      },
    });
  }

  public timeShowError(): void {
    setTimeout(() => {
      this.showError = false;
    }, 2000);
  }
}

import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css'],
})
export class SearchImageComponent {
  image: string = '';

  constructor(private _imageService: ImageService) {}

  public searchImage(): void {
    if (this.image === '') {
      this._imageService.setError('Add a search term.');
      return;
    }

    this._imageService.sendImageSearch(this.image);
  }
}

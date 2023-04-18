import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css'],
})
export class ListImageComponent {
  imageSearch: string = '';
  imageList: any[] = [];
  loading: boolean = false;

  imagePerPage: number = 30;
  totalPage: number = 0;
  actualPage: number = 1;

  constructor(private _imageService: ImageService) {
    this._imageService.getImageSearch().subscribe({
      next: (data) => {
        this.actualPage = 1;
        this.imageSearch = data;
        this.loading = true;
        this.getImageWhitTerm();
      },
    });
  }

  private getImageWhitTerm() {
    this._imageService
      .getImage(this.imageSearch, this.imagePerPage, this.actualPage)
      .subscribe({
        next: (data) => {
          if (data.hits.length === 0) {
            this._imageService.setError('Without results.');
            this.loading = false;
            return;
          }
          console.log(data);
          this.imageList = data.hits;
          this.loading = false;
          this.totalPage = Math.ceil(data.totalHits / this.imagePerPage);
          console.log(this.totalPage);
        },
        error: (e) => {
          this._imageService.setError('Without connection.');
          this.loading = false;
        },
      });
  }

  public previousPage(): void {
    this.actualPage--;
    this.imageList = [];
    this.loading = true;
    this.getImageWhitTerm();
  }

  public nextPage(): void {
    this.actualPage++;
    this.imageList = [];
    this.loading = true;
    this.getImageWhitTerm();
  }

  public showButtonPrevious(): boolean {
    if (this.actualPage === 1) return false;
    return true;
  }

  public showButtonNext(): boolean {
    if (this.actualPage === this.totalPage) return false;
    return true;
  }
}

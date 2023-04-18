import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private $error = new Subject<string>();
  private imageSearch$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  public setError(message: string) {
    this.$error.next(message);
  }

  public getError(): Observable<string> {
    return this.$error.asObservable();
  }

  public sendImageSearch(image: string) {
    this.imageSearch$.next(image);
  }

  public getImageSearch(): Observable<string> {
    return this.imageSearch$.asObservable();
  }

  public getImage(
    image: string,
    imagePerPage: number,
    actualPage: number
  ): Observable<any> {
    const KEY = '32942668-8f5f7a6f3a4df83c24a1de790';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${image}&per_page=${imagePerPage}&page=${actualPage}`;
    return this.http.get(URL);
  }
}

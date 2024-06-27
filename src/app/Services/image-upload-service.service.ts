import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BaseUrl } from '../../BaseUrl';


@Injectable
({
   providedIn: 'root'
})
export class ImageUploadService {
  private imageUrlSource = new Subject<string>();
  imageUrl$: Observable<string> = this.imageUrlSource.asObservable();

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const uploadUrl = 'upload';
    const baseUrl   = BaseUrl;

    return new Observable((observer) => {
      this.http.post(uploadUrl, formData).subscribe(
        (response: any) => {
          const imageUrl = baseUrl + response.imageUrl;
          this.imageUrlSource.next(imageUrl);
          observer.next(imageUrl);
          observer.complete();
        },
        (error: any) => {
          console.error('Image upload error:', error);
          observer.error(error);
        }
      );
    });
  }
}

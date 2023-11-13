import { Photo } from './../model/photo';

import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../util/constants';


@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  createPhoto(photoRequest: Photo): Observable<Object> {
    return this.http.post(BASE_URL_API + '/api/photos', photoRequest);
  }

  updatePhoto(id: number, photoRequest: Photo): Observable<Photo> {
    return this.http.put<Photo>(BASE_URL_API + `/api/photos/${id}`, photoRequest);
  }

  deletePhoto(id: number): Observable<Object> {
    return this.http.delete(BASE_URL_API + `/api/photos/${id}`);
  }

  showAllPhoto(): Observable<Photo[]> {
    return this.http.get<Photo[]>(BASE_URL_API + '/api/photos/public/all');
}

  getAllPhoto(): Observable<Photo[]> {
    return this.http.get<Photo[]>(BASE_URL_API + '/api/photos/public/all');
  }

  getSinglePhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(BASE_URL_API + `/api/photos/get/${id}`);
  }

  getPublicSinglePhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(BASE_URL_API + `/api/photos/public/get/${id}`);
  }
}

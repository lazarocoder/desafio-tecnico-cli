
import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '../util/constants';
import { Album } from '../model/album';


@Injectable({
  providedIn: 'root',
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  createAlbum(albumRequest: Album): Observable<Object> {
    return this.http.post(BASE_URL_API + '/api/albums', albumRequest);
  }

  updateAlbum(id: number, albumRequest: Album): Observable<Album> {
    return this.http.put<Album>(BASE_URL_API + `/api/albums/${id}`, albumRequest);
  }


  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(BASE_URL_API + `/api/albums/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.deleteAlbum(id);
  }

  showAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(BASE_URL_API + '/api/albums/public/all');
  }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(BASE_URL_API + '/api/albums/public/all');
  }

  getSingleAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(BASE_URL_API + `/api/albums/get/${id}`);
  }

  getPublicSingleAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(BASE_URL_API + `/api/albums/public/get/${id}`);
  }
}

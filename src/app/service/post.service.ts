import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASE_URL_API } from '../util/constants';
import { Post } from '../model/post';


@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    createPost(post: Post): Observable<any> {
        return this.http.post(BASE_URL_API + '/api/posts', post);
    }

    updatePost(post: Post): Observable<any> {
        return this.http.put(BASE_URL_API + `/api/posts/${post.id}`, post);
    }

    deletePost(id: number): Observable<any> {
        return this.http.delete(BASE_URL_API + `/api/posts/${id}`);
    }

    delete(id: number): Observable<any> {
        return this.deletePost(id);
    }

    showAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(BASE_URL_API + '/api/posts/public/all');
    }

    getSinglePost(id: number): Observable<Post> {
        return this.http.get<Post>(BASE_URL_API + `/api/posts/get/${id}`);
    }

    getPublicSinglePost(id: number): Observable<Post> {
        return this.http.get<Post>(BASE_URL_API + `/api/posts/public/get/${id}`);
    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASE_URL_API } from '../util/constants';
import { Comment } from '../model/comment';


@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    createComment(comment: Comment): Observable<any> {
        return this.http.post(BASE_URL_API + '/api/comments', comment);
    }

    updateComment(comment: Comment): Observable<any> {
        return this.http.put(BASE_URL_API + `/api/comments/${comment.id}`, comment);
    }

    deleteComment(id: number): Observable<any> {
        return this.http.delete(BASE_URL_API + `/api/comments/${id}`);
    }

    delete(id: number): Observable<any> {
        return this.deleteComment(id);
    }

    showAllComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(BASE_URL_API + '/api/comments/public/all');
    }

    showAllCommentsByPostId(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(BASE_URL_API + `/api/comments/public/all/${postId}`);
    }

    getSingleComment(id: number): Observable<Comment> {
        return this.http.get<Comment>(BASE_URL_API + `/api/comments/get/${id}`);
    }

    getPublicSingleComment(id: number): Observable<Comment> {
        return this.http.get<Comment>(BASE_URL_API + `/api/comments/public/get/${id}`);
    }

}
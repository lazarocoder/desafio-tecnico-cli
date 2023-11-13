import { PhotoComponent } from './photos/photo.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { CommentsComponent } from './comments/comments.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: PostsComponent, pathMatch: 'full' },
  {
    path: 'posts', component: PostsComponent
  },
  {
    path: 'albums', component: AlbumsComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'posts/:postId/comments', component: CommentsComponent
  },
  {
    path: 'signup', component: RegisterComponent
  },
  {
    path: 'photos/:photo/photo', component: PhotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

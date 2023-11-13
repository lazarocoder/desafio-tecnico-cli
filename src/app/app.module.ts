import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalExcluirModelComponent } from './modal/modal-excluir-model/modal-excluir-model.component';
import { CommentsComponent } from './comments/comments.component';
import { RegisterComponent } from './register/register.component';
import { PhotoComponent } from './photos/photo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    AlbumsComponent,
    LoginComponent,
    ModalExcluirModelComponent,
    CommentsComponent,
    RegisterComponent,
    PhotoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    MatDialogModule,

    AngularEditorModule,
    ToastrModule.forRoot(),

    AppRoutingModule,

    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalExcluirModelComponent
  ]
})
export class AppModule { }

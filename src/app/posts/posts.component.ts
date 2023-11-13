import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../service/post.service';
import { ModalExcluirModelComponent } from '../modal/modal-excluir-model/modal-excluir-model.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  post = new Post();

  posts: Post[] = [];

  loading = false;

  constructor(private postService: PostService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.showAllPosts();
  }

  getSinglePost(post: Post) {
    if (post) {
      post.btnDesabilitado = true;
      this.postService
        .getSinglePost(post.id)
        .subscribe(res => {
          this.post = res;
          post.btnDesabilitado = false;
        }, () => {
          post.btnDesabilitado = false;
        });
    }
  }


  createPost() {
    this.postService
      .createPost(this.post)
      .subscribe(res => {
        this.post = new Post();
        this.loading = false;
        this.toastr.success('Post salvo com sucesso.');
        this.showAllPosts();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar post.');
      });

  }

  updatePost() {
    this.postService
      .updatePost(this.post)
      .subscribe(res => {
        this.post = new Post();
        this.loading = false;
        this.toastr.success('Post atualizado com sucesso.');
        this.showAllPosts();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao atualizar post.');
      });
  }

  showAllPosts() {
    this.postService
      .showAllPosts()
      .subscribe(res => {
        this.posts = res;
      }, () => {
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.post.id) {
      this.updatePost();
    } else {
      this.createPost();
    }

  }

  private showModalDeletePost(id: number) {
    const dialogRef = this.dialog.open(ModalExcluirModelComponent, {
      width: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Excluir Post',
        message: `Tem certeza que deseja excluir?`,
        idModel: id,
        modelService: this.postService,
        success: 'Post excluído com sucesso.',
        error: 'Erro ao excluir post.'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.showAllPosts();
        } else {
        }
      });
  }

  deletePost(id: number) {
    this.showModalDeletePost(id);
  }

  showAllCommentsByPostId(id: number) {
    this.router.navigate(['/posts/' + id + '/comments']);
  }


}

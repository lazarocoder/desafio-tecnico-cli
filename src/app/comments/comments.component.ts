import { Component, OnInit } from '@angular/core';
import { ModalExcluirModelComponent } from '../modal/modal-excluir-model/modal-excluir-model.component';
import { Comment } from '../model/comment';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comment = new Comment();

  comments: Comment[] = [];

  loading = false;

  post = new Post();

  postId: number;

  constructor(private commentService: CommentService,
    private postService: PostService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.postId = this.route.snapshot.params['postId'];
  }

  ngOnInit() {
    this.getSinglePost();
    this.showAllCommentsByPostId();
  }

  getSinglePost() {
    if (this.postId) {
      this.postService
        .getSinglePost(this.postId)
        .subscribe(res => {
          this.post = res;
        }, () => {
        });
    }
  }

  getSingleComment(comment: Comment) {
    if (comment) {
      comment.btnDesabilitado = true;
      this.commentService
        .getSingleComment(comment.id)
        .subscribe(res => {
          this.comment = res;
          comment.btnDesabilitado = false;
        }, () => {
          comment.btnDesabilitado = false;
        });
    }
  }


  createComment() {
    this.comment.postId = this.postId;
    this.commentService
      .createComment(this.comment)
      .subscribe(res => {
        this.comment = new Comment();
        this.loading = false;
        this.toastr.success('Comentário salvo com sucesso.');
        this.showAllCommentsByPostId();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar comentário.');
      });

  }

  updateComment() {
    this.commentService
      .updateComment(this.comment)
      .subscribe(res => {
        this.comment = new Comment();
        this.loading = false;
        this.toastr.success('Comentário atualizado com sucesso.');
        this.showAllCommentsByPostId();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao atualizar comentário.');
      });
  }

  showAllCommentsByPostId() {
    if (this.postId) {
      this.commentService
        .showAllCommentsByPostId(this.postId)
        .subscribe(res => {
          this.comments = res;
        }, () => {
        });
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.comment.id) {
      this.updateComment();
    } else {
      this.createComment();
    }

  }

  private showModalDeleteComment(id: number) {
    const dialogRef = this.dialog.open(ModalExcluirModelComponent, {
      width: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Excluir Comentário',
        message: `Tem certeza que deseja excluir?`,
        idModel: id,
        modelService: this.commentService,
        success: 'Comentário excluído com sucesso.',
        error: 'Erro ao excluir comentário.'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.showAllCommentsByPostId();
        } else {
        }
      });
  }

  deleteComment(id: number) {
    this.showModalDeleteComment(id);
  }

}

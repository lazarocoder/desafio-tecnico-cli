import { Album } from './../model/album';
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../service/albums.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalExcluirModelComponent } from '../modal/modal-excluir-model/modal-excluir-model.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {


  album = new Album();

  albums: Album[] = [];

  loading = false;

  constructor(private albumsService: AlbumsService, public dialog: MatDialog, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.showAllAlbums();
  }

  getSingleAlbum(album: Album) {
    if (album) {
      album.btnDesabilitado = true;
      this.albumsService
        .getSingleAlbum(album.id)
        .subscribe(res => {
          this.album = res;
          album.btnDesabilitado = false;
        }, () => {
          album.btnDesabilitado = false;
        });
    }
  }

  createAlbum() {
    this.albumsService
      .createAlbum(this.album)
      .subscribe(res => {
        this.album = new Album();
        this.loading = false;
        this.toastr.success('Álbum salvo com sucesso.');
        this.showAllAlbums();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar álbum.');
      });
  }


  updateAlbum() {
    this.albumsService
      .updateAlbum(this.album.id, this.album)
      .subscribe(res => {
        this.album = new Album();
        this.loading = false;
        this.toastr.success('Álbum atualizado com sucesso.');
        this.showAllAlbums();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao atualizar álbum.');
      });
  }

  showAllAlbums() {
    this.albumsService
      .showAllAlbums()
      .subscribe(res => {
        this.albums = res;
      }, () => {
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.album.id) {
      this.updateAlbum();
    } else {
      this.createAlbum();
    }
  }

  private showModalDeleteAlbum(id: number) {
    const dialogRef = this.dialog.open(ModalExcluirModelComponent, {
      width: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Excluir Álbum',
        message: `Tem certeza que deseja excluir?`,
        idModel: id,
        modelService: this.albumsService,
        success: 'Álbum excluído com sucesso.',
        error: 'Erro ao excluir álbum.'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.showAllAlbums();
        } else {
        }
      });
  }

  deleteAlbum(id: number) {
    this.showModalDeleteAlbum(id);
  }

  deletePost(id: number) {
    this.showModalDeleteAlbum(id);
  }


}










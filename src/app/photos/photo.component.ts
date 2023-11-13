import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalExcluirModelComponent } from '../modal/modal-excluir-model/modal-excluir-model.component';
import { Photo } from '../model/photo';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photo = new Photo();
  photos: Photo[] = [];
  loading = false;
  albumId: number;


  constructor(private photoService: PhotoService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService)
    {this.albumId = (<any>this.router).snapshot.params['albumId']; }

  ngOnInit() {
    this.showAllPhoto();
  }

  getSinglePhoto(photo: Photo) {
    if (photo) {
      photo.btnDesabilitado = true;
      this.photoService
        .getSinglePhoto(photo.id)
        .subscribe(res => {
          this.photo = res;
          photo.btnDesabilitado = false;
        }, () => {
          photo.btnDesabilitado = false;
        });
    }
  }

  createPhoto() {
    this.photoService
      .createPhoto(this.photo)
      .subscribe(res => {
        this.photo = new Photo();
        this.loading = false;
        this.toastr.success('Foto salvo com sucesso.');
        this.showAllPhoto();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar Foto.');
      });
  }

  updatePhoto() {
    this.photoService
      .updatePhoto(this.photo.id, this.photo)
      .subscribe(res => {
        this.photo = new Photo();
        this.loading = false;
        this.toastr.success('Foto atualizado com sucesso.');
        this.showAllPhoto();
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao atualizar Foto.');
      });
  }

  showAllPhoto() {
    this.photoService
      .showAllPhoto()
      .subscribe(res => {
        this.photos = res;
      }, () => {
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.photo.id) {
      this.updatePhoto();
    } else {
      this.createPhoto();
    }
  }

  private showModalDeletePhoto(id: number) {
    const dialogRef = this.dialog.open(ModalExcluirModelComponent, {
      width: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Excluir Foto',
        message: `Tem certeza que deseja excluir?`,
        idModel: id,
        modelService: this.photoService,
        success: 'Álbum excluído com sucesso.',
        error: 'Erro ao excluir álbum.'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.showAllPhoto();
        } else {
        }
      });
  }

  deletePhoto(id: number) {
    this.showModalDeletePhoto(id);
  }
}










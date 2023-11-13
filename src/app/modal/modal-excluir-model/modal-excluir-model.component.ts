import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModelService } from '../../service/model.service';
import { ToastrService } from 'ngx-toastr';


export interface DialogData {
  title: string;
  message: string;
  success: string;
  error: string;
  idModel: string;
  modelService: ModelService;
}

@Component({
  selector: 'app-modal-excluir-model',
  templateUrl: './modal-excluir-model.component.html',
  styleUrls: ['./modal-excluir-model.component.scss']
})
export class ModalExcluirModelComponent implements OnInit {

  title: string;
  message: string;
  success: string;
  error: string;
  idModel: number;
  modelService: ModelService;
  loading = false;

  constructor(private dialogRef: MatDialogRef<ModalExcluirModelComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.title = this.data['title'];
    this.message = this.data['message'];
    this.success = this.data['success'];
    this.error = this.data['error'];
    this.idModel = +this.data['idModel'];
    this.modelService = this.data['modelService'];
  }

  confirm() {
    this.loading = true;
    this.modelService
      .delete(this.idModel)
      .subscribe(res => {
        this.loading = false;
        if (this.success) {
          this.toastr.success(this.success);
        }
        this.dialogRef.close(true);
      }, () => {
        this.loading = false;
        if (this.error) {
          this.toastr.error(this.error);
        }
        this.dialogRef.close(false);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

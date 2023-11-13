import { Component, OnInit } from '@angular/core';
import { Register } from '../model/register';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register = new Register();

  loading = false;

  constructor(private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.loading = true;

    this.authService.signup(this.register)
      .subscribe(res => {
        this.loading = false;
        this.toastr.success('Usuário salvo com sucesso.');
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao salvar usuário.');
      });
  }

}

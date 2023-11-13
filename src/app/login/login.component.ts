import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { DESAFIO_TECNICO_TOKEN_ACESSO } from '../util/constants';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new Login();

  loading = false;

  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    localStorage.removeItem(DESAFIO_TECNICO_TOKEN_ACESSO);
  }

  onSubmit() {

    this.loading = true;

    this.authService.login(this.login)
      .subscribe(res => {
        localStorage.setItem(DESAFIO_TECNICO_TOKEN_ACESSO, res.authenticationToken)
        this.loading = false;

        this.router.navigate(['/posts']);
      }, () => {
        this.loading = false;
        this.toastr.error('Erro ao acessar o sistema.');
      });
  }


}

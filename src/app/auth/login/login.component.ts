import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router';
import { Auth } from '../auth.class';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public auth: Auth={email:'',password:''}
  constructor(private LoginService: AuthServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveLogin(){
    this.LoginService.login(this.auth).subscribe( data =>{
      //console.log(data);
      localStorage.setItem("jwt-Token",data.jwt);
      localStorage.setItem("jwt-IDUser",data.payload.id);
      this.goToIndex();
    },
    error => console.log(error));
  }

  onSubmit(){
    this.saveLogin();
  }

  goToIndex(){
    this.router.navigate(['pages/index']);
  }

}

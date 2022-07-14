import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private loginService:LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password:["",[Validators.required]],
      username:["",[Validators.required]]
    })
  }

  login(){
    const login:Login = this.loginForm.value;
    this.loginService.login(login)
    .subscribe(
      (response) => {
        console.log(JSON.stringify(response.token));
        localStorage['token'] = response.token
      },
      (error) => {
        console.log(JSON.stringify(error));

      }
    )
  }

  reset() {
    this.loginForm.reset()
  }

}

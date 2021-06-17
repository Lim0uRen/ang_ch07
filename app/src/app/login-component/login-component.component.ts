import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from './User';
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^zime/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  // name$: Observable<string>;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  constructor(private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.myForm = fb.group(
      {
        'userName': ['', Validators.compose([Validators.required,
          userNameValidator, Validators.minLength(7)])],
        'password': ['', Validators.compose([Validators.required,
        Validators.minLength(6)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }
  onSubmit(value: any) {
    console.log(value);
  }
  ngOnInit(): void {
  }
  login() {
    if (this.myForm.invalid) {
      return;
    }
    this.httpClient.put(this.baseUrl + 'user', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          this.router.navigate(['./management'])
          this.authService.login();
        }
        else {
          alert("账号或密码错误")
        }
      }
    )

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CommonServiceService } from '../commonFloor/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: LoginComponent }
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonServiceService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['cabservice', [Validators.required]],
      password: ['sR8oA8tY8', [Validators.required]]
    })
  }

  login(): void {
    debugger
    let userName = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    if (userName == 'cabservice' && password == 'sR8oA8tY8') {
      this.commonService.loginStatus = true;
      this.router.navigate(['Admin/App']);
    }
  }
}

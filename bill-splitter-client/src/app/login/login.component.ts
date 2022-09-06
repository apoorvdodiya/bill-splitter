import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  loginForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getError(control: AbstractControl) {
    return control.touched && control.errors && control.errors['required'];
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.userLogIn(this.loginForm.value).subscribe(
        (res) => {
          this.spinner.hide();
          if (res?.success) {
            this.authService.setUserDetails(res.data);
            this.router.navigate(['app']);
          }
        },
        (err) => {
          this.spinner.hide();
          swal.fire({
            title: err?.error.message || 'Something went wrong!',
            icon: 'error',
          });
        }
      );
    }
    this.loginForm.markAsTouched();
  }
}

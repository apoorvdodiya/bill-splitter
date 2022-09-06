import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^(.+)@(.+)$/)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  getError(control: AbstractControl, error = 'required') {
    return control?.touched && control?.errors && control?.errors[error];
  }

  onSignUp() {
    const data = this.signUpForm.value;
    if (this.signUpForm.valid && data.password === data.confirmPassword) {
      this.spinner.show();
      this.authService.userSignUp(data).subscribe(
        (res) => {
          this.spinner.hide();
          if (res?.success) {
            this.authService.setUserDetails(res.data);
            this.router.navigate(['auth', 'login']);
          }
        },
        (err) => {
          this.spinner.hide();
          swal.fire({
            title: err?.error?.message || 'Something went wrong!',
            icon: 'error',
          });
        }
      );
    }
    this.signUpForm.markAsTouched();
  }
}

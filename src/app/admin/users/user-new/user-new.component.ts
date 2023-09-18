/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { Component } from '@angular/core';
import { UserService } from './../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../user';
@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent {
  errorMessage: string

  userForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    isDisabled: [false],
    role: [null, Validators.compose([Validators.required])]
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.errorMessage = ''
  }

  createUser() {
    const user: NewUser = {
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
      isDisabled: this.userForm.controls['isDisabled'].value,
      password: this.userForm.controls['password'].value,
      role: this.userForm.controls['role'].value
    }

    this.userService.createUser(user).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/admin/users'])
      },
      error: (err) => {
        if (err.error.message) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = 'Something went wrong, please contact system admin'
        }
      }
    })
  }
}

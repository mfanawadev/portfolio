import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  passwordValid: boolean = false
  otpValid: boolean = false
  verifyPasswordStatus: string = ''
  verifyOTPStatus: string = ''
  updatePasswordStatus: string = ''

  constructor(private studentService: StudentService, private router: Router) {}

  passwordForm = new FormGroup({
    password: new FormControl('', Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*#?&])[A-Za-z0-9@$#%*?&]{8,15}$'))
  });

  otpForm = new FormGroup({
    otp: new FormControl('', Validators.pattern('[0-9]{6}$'))
  });


  updatePasswordForm = new FormGroup({
    updatePassword: new FormControl('', Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*#?&])[A-Za-z0-9@$#%*?&]{8,15}$'))
  });

  onSubmitVerifyPassword() {
    if (this.passwordForm.valid) {

      const payload = {
        'studentNumber': localStorage.getItem('studentNumber'),
        'password': this.passwordForm.get('password')?.value
      }

      this.studentService.verifyPassword(payload).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.studentService.sendOTP(payload).subscribe({
              next: (res) => {
                if (res.statusCode === 200) {
                  this.passwordValid = true
                } else if (res.statusCode === 401) {
                  this.verifyPasswordStatus = res.message
                } else {
                  this.verifyPasswordStatus = "Something went wrong please try again."
                }
              },
              error: (err) => {
                console.log(err)
                this.verifyPasswordStatus = "Something went wrong please try again.."
              }
            })
          }
        },
        error: (err) => {
          console.log(err)
          this.verifyPasswordStatus = "Something went wrong please try again..."
        }
      })
    }
  }

  onSubmitVerifyOtp() {

    if (this.passwordForm.valid) {

      const payload = {
        'studentNumber': localStorage.getItem('studentNumber'),
        'otp': this.otpForm.get('otp')?.value
      }

      console.log(payload)

      this.studentService.verifyOTP(payload).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.otpValid = true
          } else {
            this.verifyOTPStatus = "Invalid OTP"
          }
        },
        error: (err) => {
          console.log(err)
          this.verifyOTPStatus = "Something went wrong please try again..."
        }
      })
    }

  }

  onSubmitUpdatePassword() {

    if (this.updatePasswordForm.valid) {

      const payload = {
        'studentNumber': localStorage.getItem('studentNumber'),
        'password': this.updatePasswordForm.get('updatePassword')?.value
      }

      this.studentService.changePassword(payload).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.updatePasswordStatus = res.message
            alert(res.message)
            this.router.navigate(['/profile'])
          } else {
            this.updatePasswordStatus = "Something went wrong please try again."
          }
        },
        error: (err) => {
          console.log(err)
          this.updatePasswordStatus = "Something went wrong please try again..."
        }
      })
    }

  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public errorMsg: string = ''

  constructor(private auth: AuthService, private router: Router) { }

  studentForm = new FormGroup({
    studentNumber: new FormControl('', Validators.pattern('\\d{8}')),
    password: new FormControl('', Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*#?&])[A-Za-z0-9@$#%*?&]{8,15}$')),
  });

  get studentNumber() {
    return this.studentForm.get('studentNumber');
  }

  get password() {
    return this.studentForm.get('password');
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const payload = {
        "studentNumber": this.studentForm.get('studentNumber')?.value,
        "password": this.studentForm.get('password')?.value
      }

      this.auth.login(payload).subscribe({
        next: (res) => {
          if (res.token){
            this.auth.setToken(res.token)
            this.router.navigate(['/profile'])
          } else {
            this.errorMsg = "Authentication failed please try again."
            console.log(this.errorMsg)
          }
        },
        error: (err) => {
          this.errorMsg = "Something went wrong please try again.";
          console.log(err)
        }
      })

    }
  }

  register() {
    this.router.navigate(['/register'])
  }
}

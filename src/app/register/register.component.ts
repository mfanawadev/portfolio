import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])),
    contactNumber: new FormControl('', Validators.pattern('0[0-9]{9}')),
    password: new FormControl('', Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*#?&])[A-Za-z0-9@$#%*?&]{8,15}$')),
    confirmPassword: new FormControl('', Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%*#?&])[A-Za-z0-9@$#%*?&]{8,15}$')),
  });

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get contactNumber() {
    return this.registerForm.get('contactNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const payload = {
        'firstName': this.registerForm.get('firstName')?.value,
        'lastName': this.registerForm.get('lastName')?.value,
        'email': this.registerForm.get('email')?.value,
        'mobile': this.registerForm.get('contactNumber')?.value,
        'password': this.registerForm.get('password')?.value
      }

      this.auth.register(payload).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            alert(`Your student number is ${res.students.studentNumber} please keep it safe as you will use to login`)
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err)
          alert('Something went wrong please try again.')
        }
      })
    }
  }
}

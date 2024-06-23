import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public profile: any
  constructor(private studentService: StudentService, private router : Router){}

  ngOnInit(): void {

    this.studentService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        localStorage.setItem('studentNumber', this.profile?.students?.studentNumber)
        localStorage.setItem('email', this.profile?.students?.email)
      },
      error: (err) => {
        console.error('Error fetching profile', err);
        this.router.navigate(['/login']);
      }
    });

  }

  updatePassword() {
    this.router.navigate(['/update-password']);
  }

}

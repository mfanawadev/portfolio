import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  private subscription!: Subscription;

  constructor(private authService: AuthService, private router :Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  logOut() {
    this.router.navigate(["/login"]);
    this.authService.clearToken();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

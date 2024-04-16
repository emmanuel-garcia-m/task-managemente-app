import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Output() menuToggled = new EventEmitter<boolean>();

  public userName: string | undefined;

  constructor(private authService: AuthService,
    private router: Router){ }

    ngOnInit(): void {     
      this.userName = "Usuario de prueba"
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoadingScreenService } from '@services/loading-screen.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent {
  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(8)]],
  });

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private loadingScreenService: LoadingScreenService){
    
  }

  doLogin() {
    if (this.form.valid) {
      this.loadingScreenService.startLoading();
      const {email, password} = this.form.getRawValue();
      this.authService.login(email,password);
      this.loadingScreenService.stopLoading();
      this.router.navigate(['/app']);      
    }
  }

}


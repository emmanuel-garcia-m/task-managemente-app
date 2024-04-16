import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenManagenmentService } from '@services/token-managenment.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(
    private http: HttpClient,
    private tokenManagenmentService: TokenManagenmentService  
  ) {  }

  login(email: string, password: string){   
    this.tokenManagenmentService.saveToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao");
  }

  logout(){   
    this.tokenManagenmentService.removeToken();
  }

}

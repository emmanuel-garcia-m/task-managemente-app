import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie} from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenManagenmentService {

  constructor() { }

  saveToken(token: string){
    setCookie('task-app-token', token, {expires: 365, path: '/'});
  }

  getToken() : string | undefined{
    return getCookie('task-app-token');
  }

  removeToken(){
    return removeCookie('task-app-token');
  }
}

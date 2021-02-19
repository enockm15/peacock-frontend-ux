import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
export interface SignResult {
  success: boolean;
  error?: string;
}

export interface UserSession {
  data: {
    description?: string;
    user_name: string;
    user_role: string;
    token: string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private static userSession: AuthObj;

  constructor(private http:  HttpClient, private route: Router) { }

  @Output() logInEvent:  EventEmitter<SignResult> = new EventEmitter();
  @Output() logOutEvent:  EventEmitter<void> = new  EventEmitter();

  public authenticate (creds:loginCred): void {
    console.log(creds);
    this.http.post(environment.applicationServerURL,creds)
      .pipe(
        retry(3),
        catchError(this.handleError)
      ).subscribe((result:any) => {
      if (result.success === true) {
        AuthenticationService.userSession = null;
        let tmpUserSession:  AuthObj = {
          id: result.data.id,
          user_id: result.data.user_id,
          first_name: result.data.first_name,
          account_status: result.data.account_status,
          description: result.data.description,
          token: result.data.token

        }
        AuthenticationService.userSession = tmpUserSession;

        this.logInEvent.emit({success: true });
        this.route.navigate(['/dashboard'])
        return true;
      } else {
        this.logInEvent.emit({ success: false, error: 'User is not authorised to access the application'});
        return false;
      }
    })
  }


  private handleError(err: HttpErrorResponse) {
    var message: string = 'Unable to login, please check your network settings!';

    console.log(err);

    if (err.error instanceof ErrorEvent) {
    } else {
      try {
        if (err.error.status.code !== 500) {
          message = err.error.status.errors[0].message;
        }
      } catch (e) {
      }
    }
    return throwError(message);
  };

  public getToken(): string {
    if (AuthenticationService.userSession) {
      return AuthenticationService.userSession.token;
    }
  }

}

export interface AuthObj {
  id: any
  user_id: any
  first_name: any
  account_status: any
  description: any
  token: any
}

export class loginCred {
  method:any
  params: {
    user_id:string
    password:string
  }

}


import {EventEmitter, Injectable} from '@angular/core';
import {AuthenticationService} from '../pages/auth/authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(
    private authentication:  AuthenticationService,
    private http:  HttpClient,
  ) { }


  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authentication.getToken()
      })
    }
  }

  private static getHttpOptionsBasic() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      }),
      withCredentials: false
    };
  }

  private static getHeaders(){
    return {
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    }
  }

  public invokePost<B, R, E>(api: string, body: B, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<E>): void {
    // processingEvent.emit(true);

    const httpOptions = this.getHttpOptions();

    this.http.post<R>(api, body, httpOptions)
      .pipe(
        retry(2)
      ).subscribe((result: R) => {
        // processingEvent.emit(false);
        console.log("here1.....")
        resultEvent.emit(result);
      }
      , (errors: E) => {
        console.log(errors);
        // processingEvent.emit(false);
        errorsEvent.emit(errors);
      }
    );
  }


  public invokePostMultipart<B, R, E>(api: string, body: B, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<E>): void {
    // processingEvent.emit(true);

    const httpOptions = HttpUtilsService.getHeaders();

    this.http.post<R>(api, body, httpOptions)
      .pipe(
        // retry(2)
      ).subscribe((result: R) => {
        // processingEvent.emit(false);
        console.log("Result here is:.....");
        console.log(JSON.stringify(result));
        resultEvent.emit(result);
      }
      , (errors: E) => {
        // processingEvent.emit(false);
        errorsEvent.emit(errors);
      }
    );
  }

  public invokePut<B, R, E>(endpoint: string, body: B, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<E>, httpErrorHandler: any): void {
    processingEvent.emit(true);
    const httpOptions = this.getHttpOptions();

    this.http.put<R>(endpoint, body, httpOptions)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      ).subscribe((result: R) => {
      processingEvent.emit(false);
      resultEvent.emit(result);
    }, (errors: E) => {
      processingEvent.emit(false);
      errorsEvent.emit(errors);
    });
  }

  public invokeGet<R, E>(endpoint: string, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<E>, httpErrorHandler: any): void {
    processingEvent.emit(true);

    const httpOptions = this.getHttpOptions();

    this.http.get<R>(endpoint, httpOptions)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      ).subscribe((result: R) => {
        processingEvent.emit(false);
        resultEvent.emit(result);
      }, (errors: E) => {
        processingEvent.emit(false);
        errorsEvent.emit(errors);
      },
      () => {});
  }


  public invokePostBasic<B, R, E>(endpoint: string, body: B, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<E>, httpErrorHandler: any): void {
    processingEvent.emit(true);

    const httpOptions = HttpUtilsService.getHttpOptionsBasic();

    this.http.post<R>(endpoint, body, httpOptions)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      ).subscribe((result: R) => {
      processingEvent.emit(false);
      resultEvent.emit(result);
    }, (errors: E) => {
      processingEvent.emit(false);
      errorsEvent.emit(errors);
    });
  }

}

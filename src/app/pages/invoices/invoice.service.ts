import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication.service';
import {HttpUtilsService} from '../../commons/http-utils.service';
import {environment} from '../../../environments/environment';
import {DataServerError, DataServiceError} from '../../models/http-models';
import {Observable, throwError} from 'rxjs';
import {InvoiceModel} from '../../models/invoice-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) {
    this.httpService = new HttpUtilsService(auth, http);
  }

  private httpService: HttpUtilsService;
  private baseAPIUri = environment.applicationServerURL + "/invoices/v1";


  private handleError(responseError: HttpErrorResponse) {
    const errors: DataServiceError[] = [];

    if (responseError.error instanceof ErrorEvent) {
    } else {
      try {
        if (responseError.status === 403) {
          errors.push({message: 'Authentication failed, session has expired!', path: '', value: ''});
        }

        if (responseError.status === 401) {
          errors.push({message: 'Authorization error, User does not has access to the requested resource!', path: '', value: ''});
        }

        if (responseError.error.status) {
          if (responseError.error.status.errors && responseError.error.status.errors.length > 0) {
            responseError.error.status.errors.forEach((error: DataServiceError) => {
              if (!errors.includes(error)) {
                errors.push(error);
              }
            });
          }
        }

        if (responseError.error.errors.length > 0) {
          responseError.error.errors.forEach((error: DataServiceError) => {
            if (!errors.includes(error)) {
              errors.push(error);
            }
          });
        }
      } catch (e) {
      }

      if (errors) {
        if (errors.length === 0) {
          errors.push({message: 'Unexpected error, please contact your administrator', path: '', value: ''});
        }
      }
    }

    return throwError(errors);
  }

  public allInvoices(processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.baseAPIUri + '/all';
    this.httpService.invokeGet(api, processingEvent, resultEvent, error, this.handleError);
  }

  public getInvoiceByID(id: any, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.baseAPIUri + '/view/' + `${id}`;
    this.httpService.invokeGet(api, processingEvent, resultEvent, error, this.handleError);
  }

  findInvoices():  Observable<InvoiceModel[]> {
    const api = this.baseAPIUri + '/all';
    return this.http.get(api, {
    }).pipe(
      map(res =>  res["data"])
    );
  }

}

import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication.service';
import {HttpUtilsService} from '../../commons/http-utils.service';
import {environment} from '../../../environments/environment';
import {DataRequest, DataServerError, DataServiceError} from '../../models/http-models';
import {throwError} from 'rxjs';
import {ProductItemModel} from '../../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) {
    this.httpService = new HttpUtilsService(auth, http);
  }

  private httpService: HttpUtilsService;
  private baseAPIUri = environment.applicationServerURL + "/product-items/v1";
  private goodsApiUri = environment.applicationServerURL + "/goods/v1"


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

  public saveProductItem(productItem: ProductItemModel, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.baseAPIUri + '/create'
    const _request: DataRequest = new DataRequest();
    _request.header = {
      operation: "CREATE_PRODUCT"
    }
    _request.data = productItem;
    this.httpService.invokePostBasic(api, _request, processingEvent, resultEvent, error, this.handleError);
  }

  public updateProductItem(productItem: ProductItemModel, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.baseAPIUri + '/update'
    const _request: DataRequest = new DataRequest();
    _request.header = {
      operation: "UPDATE_PRODUCT"
    }
    _request.data = productItem;
    this.httpService.invokePut(api, _request, processingEvent, resultEvent, error, this.handleError);
  }

  public allProductItems(processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.baseAPIUri + '/all';
    this.httpService.invokeGet(api, processingEvent, resultEvent, error, this.handleError);
  }

  public getProductItemByID(id: any, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.baseAPIUri + '/view/' + `${id}`;
    this.httpService.invokeGet(api, processingEvent, resultEvent, error, this.handleError);
  }

  public postToEfris(productItem: any, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.goodsApiUri + '/goods-upload/';
    const _request: DataRequest = new DataRequest();
    _request.header = {
      operation: "GOODS_UPLOAD"
    }
    _request.data = productItem;
    this.httpService.invokePostBasic(api, _request, processingEvent, resultEvent, error, this.handleError);
  }

  public updateEfrisStock(stock: any, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<any>, error: EventEmitter<DataServerError[]>): void {
    const api = this.goodsApiUri + '/maintain-stock';
    const _request: DataRequest = new DataRequest();
    _request.header = {
      operation: "UPDATE_STOCK"
    }
    _request.data = stock;
    this.httpService.invokePostBasic(api, _request, processingEvent, resultEvent, error, this.handleError);
  }
}

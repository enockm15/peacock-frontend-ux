export class DataRequest {
  header: {
    operation: string
  };
  data:any
}

export class DataResponse {
  status: {
    response_code:string
    response_message:string
    operation:string
    request_uri:string
    additional_details:string
  };
  data: any
}

export interface DataServiceError {
  message: string;
  path: string;
  value: string;
  code?: string;
  values?: string[];
}



export interface DataServerError {
  message: string
  errorCode:  string
}

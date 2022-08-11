export interface ResponseHttpModel {
  data: object | boolean;
  message: string | string[];
  title: string;
  pagination?: any;
}

export interface ErrorResponseHttpModel {
  error: string;
  message: string | string[];
  statusCode: number;
}

export interface WebResponse {
  code: number;
  status: string;
  data: any;
}

export interface WebResponseErr {
  code: number;
  details: string;
  message: string;
}

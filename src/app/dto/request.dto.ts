export class RegisterDevice {
  account_id: string;
  fcm_token: string;
  device_id: string;

  constructor(request: any) {
    this.account_id = request.account_id;
    this.fcm_token = request.fcm_token;
    this.device_id = request.device_id;
  }
}

export class ApiResponse {
  data: any;
  message: string;
  code: number;

  constructor(request: any) {
    this.data = request.data;
    this.message = request.message;
    this.code = request.code;
  }
}

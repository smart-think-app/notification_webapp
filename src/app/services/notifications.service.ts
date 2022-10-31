import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, RegisterDevice } from './../dto/request.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private _httpClient: HttpClient) {}

  registerNotification(request: RegisterDevice) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post<ApiResponse>('http://localhost:3000/api/devices', request)
        .subscribe({
          next: (resp) => {
            console.log(resp);
            resolve(resp);
          },
          error: (e) => {
            console.log(e);
            reject(e);
          },
        });
    });
  }
}

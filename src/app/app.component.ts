import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { NotificationsService } from './services/notifications.service';
import { RegisterDevice } from './dto/request.dto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'notification-webapp';

  constructor(private _notificationService: NotificationsService){

  }
  initFcmToken() {
    const firebaseConfig = {
      apiKey: "AIzaSyB18_nAFNwDXvPnI6s3LFyf0AsMzOAhqBc",
      authDomain: "parking-4292e.firebaseapp.com",
      projectId: "parking-4292e",
      storageBucket: "parking-4292e.appspot.com",
      messagingSenderId: "460591389535",
      appId: "1:460591389535:web:90a4e9d6bf112f644f74ea",
      measurementId: "G-1W0Z34FJW2"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    getToken(messaging, {
      vapidKey:
        'BAYt0leKWWhorFaYTxlpulnp5SN6hh1UmB7GPPXE1LpkrDagWRejnlAVNjdpuJyZ7LEYhN06aOoEhHAuCNwr_xc',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('fcm_token');
          console.log(currentToken);
          const requestDevice: RegisterDevice = {
            account_id :'huytest1',
            fcm_token: currentToken,
            device_id: 'device-web'
          }
          this._notificationService.registerNotification(requestDevice);
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initFcmToken();
  }
}

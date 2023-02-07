import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

/**
 * @author Jorge Hernández Roselló
 * @date 2020/06/03
 * @description Notification services
 */

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  successIcon: SweetAlertIcon = 'success';
  infoIcon: SweetAlertIcon = 'info';
  errorIcon: SweetAlertIcon = 'error';

  constructor(public router: Router) {}

  getNotificationConfirm(text: string) {
    Swal.fire({
      icon: 'success',
      title: '¡SUCCESS!',
      text: text,
      // timer: 3000,
      allowOutsideClick: false,
    });
  }

  getNotificationWarning(text: string) {
    Swal.fire({
      icon: this.infoIcon,
      title: '¡WARNING!',
      text: text,
      allowOutsideClick: false,
    });
  }

  getNotificationError(errorAction: string, textError: string) {
    Swal.fire({
      icon: 'error',
      title: errorAction,
      text: textError,
      allowOutsideClick: false,
    });
  }

}

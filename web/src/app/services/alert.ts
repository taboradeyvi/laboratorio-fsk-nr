import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string): void {
    Swal.fire('Success', message, 'success');
  }

  error(message: string): void {
    Swal.fire('Error', message, 'error');
  }

  warning(message: string): void {
    Swal.fire('Warning', message, 'warning');
  }
}

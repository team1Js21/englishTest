import { ErrorService } from './../../services/error.service';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService, private zone: NgZone) {}

  handleError(error: Error) {
    this.zone.run(() =>
      this.errorService.logError(error.message || 'Undefined client error')
    );

    console.error('Error from global error handler', error);
  }
}

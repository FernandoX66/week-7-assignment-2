import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Response) {
    alert('An unexpected error ocurred');
  }
}

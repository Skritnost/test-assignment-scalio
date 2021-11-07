import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';
import { catchError, Observable, throwError } from 'rxjs';

const SNACK_BAR_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'center',
  verticalPosition: 'top',
  duration: 4000,
  panelClass: 'error-snackbar',
};

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor (private _snackBar: MatSnackBar) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError (response: HttpErrorResponse): Observable<never> {
    const errorMessage = response.error?.message || 'Error has occurred';

    this._snackBar.open(errorMessage, null, SNACK_BAR_CONFIG);

    return throwError(() => response);
  }
}

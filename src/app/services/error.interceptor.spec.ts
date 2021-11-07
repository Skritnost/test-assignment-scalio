import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { defer, throwError } from 'rxjs';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
      ],
      providers: [
        ErrorInterceptor,
      ],
    });

    interceptor = TestBed.inject(ErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('error is passed', () => {
    const error = 'this is an error';

    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    httpHandlerSpy.handle.and.returnValue({
      pipe: () => {
        return defer(() => throwError(() => error));
      },
    });

    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe({
        error: (err) => {
          expect(err).toEqual(error);
        },
      });
  });
});

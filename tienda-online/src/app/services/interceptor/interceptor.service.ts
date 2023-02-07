import { CONSTANTS } from './../../app.constans';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SERVER } from '../../proxies/proxy-services.server';
import { PROXY_SERVICES } from '../../proxies/proxy-services.routes';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  reqClone: any;

  constructor(
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Validation
    const to = localStorage.getItem('TO');
    const from= localStorage.getItem('FROM');
    const amount = localStorage.getItem('AMOUNT');
      switch (req.url) {       
        case `${SERVER.CONTEXT}${PROXY_SERVICES.exchange.convert}${to}&from=${from}&amount=${from}`:
          const headers = new HttpHeaders().set('apikey', CONSTANTS.CURRENCY.KEY);        
          req = req.clone({
            url: req.url,
            headers,
            responseType: 'blob',
          });
          break;
        default:
          // console.log("Configurada la ruta por default");
          req = req.clone({
            url: req.url,
          });
          break;
      }
    
    // Error handling
    return next.handle(req).pipe(catchError(this.errorHandling));
  }
  /**
   * Method for generic error Handling
   * @param err
   */
  errorHandling(err: HttpErrorResponse) {
    let errorToReturn: Error;
    switch (err.status) {
      // Bad Request
      case 400:
        if (typeof (err.error) === "object" && err.error != null && err.error != undefined) {
          const firstError = `El campo ${Object.keys(err.error)[0]} ${err.error[Object.keys(err.error)[0]]} `
          errorToReturn = new Error(firstError);

          //errorToReturn = new Error(JSON.stringify(err.error));
        } else errorToReturn = new Error("error 400")

        break;
      // Unauthorized
      case 401:

        localStorage.clear();
        window.location.reload();
        // Warning...
        errorToReturn = new Error('error 401');
        break;
      // Payment Required
      case 402:
        errorToReturn = new Error('error 402');
        break;
      // Internal Server Error
      case 500:
        // Define specific Error Type
        errorToReturn = new Error('error 500');

        break;
      default:
        console.log(err.status, err.message)
        errorToReturn = new Error('error no registrado');
        break;
    }
    return throwError(errorToReturn);
  }
}

import { Injectable } from '@angular/core';
import { SERVER } from '../proxies/proxy-services.server';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CONSTANTS } from '../app.constans';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
* @author Nelson Sánchez Alvarez
* @date 2023/02/07
*/

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  private REST_API_SERVER = SERVER.CONTEXT; 
  constructor(private http: HttpClient) {
       }

  /**
   * GET, POST, PUT and DELETE request handling method
   */
  public getResources(method: string, url: string, body = null): Observable<any> {
    let observableResult = new Observable();
    switch (method) {
      case CONSTANTS.METHOD.GET:
        // Method call 'sendGetRequest'
        observableResult = this.sendGetRequest(url);
        break;
        case CONSTANTS.METHOD.GET2:
          // Method call 'sendGetRequest'
          observableResult = this.sendGet2Request(url);
          break;
      case CONSTANTS.METHOD.POST:
        // Method call 'sendPostRequest'
        observableResult = this.sendPostRequest(url, body);
        break;
      case CONSTANTS.METHOD.PUT:
        // Method call 'sendPutRequest'
        observableResult = this.sendPutRequest(url, body);
        break;
      case CONSTANTS.METHOD.DELETE:
        // Method call 'sendPutRequest'
        observableResult = this.sendDeleteRequest(url);
        break;
      case CONSTANTS.METHOD.PATCH:
        // Method call 'sendPutRequest'
        observableResult = this.sendPatchRequest(url, body);
        break;

    }
    return observableResult;
  }

  /**
   * HTTP GET method call
   * @param pathRouter
   */
  public sendGetRequest(pathRouter: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + pathRouter).pipe(catchError(this.handleError));
  }
   /**
   * HTTP GET method call
   * @param pathRouter
   */
  public sendGet2Request(pathRouter: string): Observable<any> {
    // console.log('aqui',pathRouter);
    return this.http.get(this.REST_API_SERVER + pathRouter, {responseType: 'blob'}).pipe(catchError(this.handleError));
  }

  /**
   * HTTP POST method call
   * @param pathRouter
   * @param body
   */
  public sendPostRequest(pathRouter: string, body: any): Observable<any> {
    return this.http.post(this.REST_API_SERVER + pathRouter, body).pipe(catchError(this.handleError));
  }

  /**
   * HTTP PUT method call
   * @param pathRouter
   * @param body
   */
  public sendPutRequest(pathRouter: string, body: any): Observable<any> {
    return this.http.put(this.REST_API_SERVER + pathRouter, body).pipe(catchError(this.handleError));
  }
  /**
  * HTTP Patch method call
  * @param pathRouter
  * @param body
  */
  public sendPatchRequest(pathRouter: string, body: any): Observable<any> {
    return this.http.patch(this.REST_API_SERVER + pathRouter, body).pipe(catchError(this.handleError));
  }
  /**
  * HTTP DELETE method call
  * @param pathRouter
  * @param body
  */
  public sendDeleteRequest(pathRouter: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + pathRouter).pipe(catchError(this.handleError));
  }

  /**
   * Method for handling HTTP errors
   * @param error
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

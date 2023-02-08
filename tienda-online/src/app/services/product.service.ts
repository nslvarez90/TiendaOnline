import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SERVER } from '../proxies/proxy-services.server';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CONSTANTS } from '../app.constans';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PROXY_SERVICES } from '../proxies/proxy-services.routes';

/**
* @author Nelson Sánchez Alvarez
* @date 2023/02/07
*/
@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private router: Router, private http: HttpClient) { }

    public getAllProduct(url: string): Observable<any> {
        return this.http.get(url);
    }
}

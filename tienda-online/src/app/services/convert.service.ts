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
export class ConvertService {

    constructor(private router: Router, private http: HttpClient) { }

    convertAmount(to: string, from: string, amount: any): Observable<any> {       
       // headers.append("apikey", CONSTANTS.CURRENCY.KEY);
        return this.http.get(`${SERVER.CONTEXT}${PROXY_SERVICES.exchange.convert}${from}&to=${to}&amount=${amount}`)



    }
}

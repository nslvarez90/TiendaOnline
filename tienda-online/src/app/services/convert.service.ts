import { Router } from '@angular/router';
import { GeneralService } from './general.service';
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
export class ConvertService {

    constructor(private generalService: GeneralService, private router: Router) { }

    convertAmount(to: string, from: string, amount: any): Observable<any> {
        localStorage.setItem('TO', to);
        localStorage.setItem('FROM', from);
        localStorage.setItem('AMOUNT', amount);
        return this.generalService.getResources(
            CONSTANTS.METHOD.GET,
            `${PROXY_SERVICES.exchange.convert}${to}&from=${from}&amount=${amount}`
        );
    }
}

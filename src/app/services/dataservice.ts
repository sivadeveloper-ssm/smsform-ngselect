import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import * as AppConstant from '../Constants/const';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private endpoint = environment.baseUrl;

  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };




  constructor (private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  /*getData(attribute): Observable<any> {
    return this.http.get(this.endpoint + attribute).pipe(
      map(this.extractData));

  } */

  getCFRRelatedIDs(attr,arrayOfObjects) : Observable<any> {
      return this.http.get(this.endpoint + attr + "/" + arrayOfObjects).pipe(map(this.extractData));
  }


  getData(): Observable<any> {
    
    let areasRequest = this.http.get(this.endpoint + AppConstant.constfields.AREAS).pipe(
      map(this.extractData));
    let authorRequest = this.http.get(this.endpoint + AppConstant.constfields.AUTHORS).pipe(map(this.extractData));
    let languageRequest = this.http.get(this.endpoint + AppConstant.constfields.LANGUAGES).pipe(map(this.extractData));
    let governingRequest = this.http.get(this.endpoint + AppConstant.constfields.GOVERNINGBODIES).pipe(map(this.extractData));
    let citationsRequest = this.http.get(this.endpoint + AppConstant.constfields.CITATIONS).pipe(map(this.extractData));
    let industriesRequest = this.http.get(this.endpoint + AppConstant.constfields.INDUSTRIES).pipe(map(this.extractData));
    let topicsRequest = this.http.get(this.endpoint + AppConstant.constfields.TOPICS).pipe(map(this.extractData));
    let productRequest = this.http.get(this.endpoint + AppConstant.constfields.PRODUCTS).pipe(map(this.extractData));
    let synonymsRequest = this.http.get(this.endpoint + AppConstant.constfields.SYNONYMS).pipe(map(this.extractData));
    let templateTypesRequest = this.http.get(this.endpoint + AppConstant.constfields.TEMPLATETYPES).pipe(map(this.extractData));
    let contentSubTypesRequest = this.http.get(this.endpoint + AppConstant.constfields.TYPES).pipe(map(this.extractData));
    let contentTypesRequest = this.http.get(this.endpoint + AppConstant.constfields.CONTENTTYPES).pipe(map(this.extractData));
    let geographiesRequest = this.http.get(this.endpoint + AppConstant.constfields.GEOGRAPHIES).pipe(map(this.extractData));
    let correctResponsesRequest = this.http.get(this.endpoint + AppConstant.constfields.CORRECTRESPONSES).pipe(map(this.extractData));
    return forkJoin([authorRequest, languageRequest, areasRequest,governingRequest, citationsRequest,
       industriesRequest, topicsRequest, productRequest, synonymsRequest, templateTypesRequest,
      contentSubTypesRequest, contentTypesRequest, geographiesRequest,correctResponsesRequest]).pipe(catchError(error => of(error)));
  }  








  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  //log the error to console.
      console.log(~`${operation}failed: ${error.message}`); //better job of transforming error for user consumption
      return of(result as T);
    };
  }
}




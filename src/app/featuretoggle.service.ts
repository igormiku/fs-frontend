import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FeatureToggle } from './featuretoggle';
import { FEATURETOGGLES } from './mock-featuretoggle';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FeatureToggleService {

  private WebServiceURL = 'http://localhost:10000/api/v1/features';
  private WebServiceURLAdd = 'http://localhost:10000/api/v1/features/add';

  subjecFeatureToggleServiceNotifier: Subject<null> = new Subject<null>();
  
  notifyAboutFeatureTogglesChange() {
    this.subjecFeatureToggleServiceNotifier.next(null);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})   
  };

  constructor(private http: HttpClient) { }


  getFeatureToggles(): Observable<FeatureToggle[]> {
    //rewrite to HTTP.Get
    //const featureToggles = of(FEATURETOGGLES);
    //return featureToggles;
    return this.http.get<FeatureToggle[]>(this.WebServiceURL)
      .pipe(
        //tap(_ => console.log('fetched FeatureToggles')),
        catchError(this.handleError<FeatureToggle[]>('getFeatureToggles', []))
      )

  }

  getFeatureToggle(id: string): Observable<FeatureToggle> {
    return this.http.get<FeatureToggle>(this.WebServiceURL+"/"+id, this.httpOptions).pipe(
      catchError(this.handleError<FeatureToggle>('addFeatureToggle'))
    )
  }
  

  addFeatureToggle(ft: FeatureToggle): Observable<FeatureToggle> {
 
    return this.http.post<FeatureToggle>(this.WebServiceURLAdd, ft, this.httpOptions).pipe(
      catchError(this.handleError<FeatureToggle>('addFeatureToggle'))
    )
  }
  
  updateFeatureToggle(ft: FeatureToggle): Observable<FeatureToggle> {

    return this.http.put<FeatureToggle>(this.WebServiceURL, ft, this.httpOptions).pipe(
      catchError(this.handleError<FeatureToggle>('updateFeatureToggle'))
    )
    
  }

  removeFeatureToggle(ft: FeatureToggle): Observable<FeatureToggle> {

    //for DELETE method body should be inside options, or possible to rewrite backend for URL param instead
    var deleteHttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      body: ft
    };
      
    return this.http.delete<FeatureToggle>(this.WebServiceURL, deleteHttpOptions).pipe(
        catchError(this.handleError<FeatureToggle>('updateFeatureToggle'))
      ) 

    }
  

    
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}

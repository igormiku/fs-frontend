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

  //TODO: bring it to config.json
  private WebServiceURL = 'http://localhost:10000/api/v1/features';
  private WebServiceURLAdd = 'http://localhost:10000/api/v1/features/add';

  CurrentFeatureToggleObs: Subject<FeatureToggle> = new Subject<FeatureToggle>();
  DeleteFeatureToggleObs: Subject<FeatureToggle> = new Subject<FeatureToggle>();
  AddFeatureToggleObs: Subject<FeatureToggle> = new Subject<FeatureToggle>();
  UpdateFeatureToggleObs: Subject<FeatureToggle> = new Subject<FeatureToggle>();
  
  constructor(private http: HttpClient) { }

  notifyCurrentFeatureToggleChange(ft: FeatureToggle) {
   this.CurrentFeatureToggleObs.next(ft);
  }

  notifyDeleteFeatureToggle(ft: FeatureToggle) {
    this.DeleteFeatureToggleObs.next(ft);
  }

  notifyAddFeatureToggle(ft: FeatureToggle) {
    this.AddFeatureToggleObs.next(ft);
  }

  notifyUpdateFeatureToggle(ft: FeatureToggle) {
    this.UpdateFeatureToggleObs.next(ft);
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})   
  };


  //HTTP get for entire list of FeatureToggle
  getFeatureToggles(): Observable<FeatureToggle[]> {
    return this.http.get<FeatureToggle[]>(this.WebServiceURL)
      .pipe(
        catchError(this.handleError<FeatureToggle[]>('getFeatureToggles', []))
      )
  }

  //HTTP get for one of FeatureToggle
  getFeatureToggle(id: string): Observable<FeatureToggle> {
    return this.http.get<FeatureToggle>(this.WebServiceURL+"/"+id, this.httpOptions).pipe(
      catchError(this.handleError<FeatureToggle>('addFeatureToggle'))
    )
  }
  
 //HTTP POST to add one of FeatureToggle
  addFeatureToggle(ft: FeatureToggle): Observable<FeatureToggle> {
    return this.http.post<FeatureToggle>(this.WebServiceURLAdd, ft, this.httpOptions).pipe(
      catchError(this.handleError<FeatureToggle>('addFeatureToggle'))
    )
  }
  //HTTP PUT to modify one of FeatureToggle
  updateFeatureToggle(ft: FeatureToggle): Observable<FeatureToggle> {
    return this.http.put<FeatureToggle>(this.WebServiceURL, ft, this.httpOptions).pipe(
      catchError(this.handleError<FeatureToggle>('updateFeatureToggle'))
    )
  }

   //HTTP DELETE to remove one of FeatureToggle
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

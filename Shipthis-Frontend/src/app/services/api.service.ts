import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService{
    constructor(private http: HttpClient){}

    get(url: string):Observable<any>{
        return this.http.get(url);
    }

    post(url: string, objPost: object): Observable<any>{
        return this.http.post(url, objPost, {responseType: 'text'});
    }

    put(url: string, objPost: object): Observable<any>{
        return this.http.put(url, objPost, {responseType: 'text'});
    }

    delete(url: string ): Observable<any>{
        return this.http.delete(url, {responseType: 'text'});
    }

}
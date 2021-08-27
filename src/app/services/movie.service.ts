import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../Movie';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/Filter';
import { Pagination } from 'src/app/Pagination';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl = 'http://movie-challenge-api-xpand.azurewebsites.net/api/movies';
  
  constructor(private http: HttpClient) { }

  getMovies(pagination: Pagination, filter: Filter): Observable<Movie[]> {
    let params = null;
    if(filter.start && filter.end){
      params = new HttpParams().set("page", pagination.page).set("size", pagination.size).set("start", filter.start).set("end", filter.end)
    }else{
      params = new HttpParams().set("page", pagination.page).set("size", pagination.size)
    }
    return this.http.get(this.apiUrl, {params}).pipe(map((res) => {
      //@ts-ignore
      return res.content as Movie[]}))
  }
  
  getMovie(id: string): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Movie>(url);
  }
}

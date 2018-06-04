import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private http :  HttpClient) { }

  public search(term: string) {
    return this.http.get(`http://localhost:3000/search?term=${term}`).toPromise()
  }

}

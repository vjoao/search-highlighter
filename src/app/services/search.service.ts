import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000'

@Injectable()
export class SearchService {

  constructor(private http :  HttpClient) { }

  public search(term: string) {
    return this.http.get(`${API_URL}/search?term=${term}`).toPromise()
  }

}

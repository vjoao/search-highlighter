import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private term : string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  performSearch (term) {
    this.searchService.search(term).then(results => {
      console.log(results)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private term : string;
  private result : string;
  private highlighted: SafeHtml;

  constructor(private searchService: SearchService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  generateHighlights (type, results) {
    const { brands : brandCounts, clothes: clothCounts } = results

    const merged = brandCounts.map((brandMatch, index) => {
      const clothMatch = clothCounts[index]

      if(brandMatch.count === 0 && clothMatch.count === 0) {
        return brandMatch.brand
      } else if(brandMatch.count > clothMatch.count) {
        return `<b>${brandMatch.brand}</b>`
      } else if (brandMatch.count < clothMatch.count) {
        return `<em>${brandMatch.brand}</em>`
      }

      return `<b><em>${brandMatch.brand}</em></b>`
    })

    this.highlighted = this.sanitizer.bypassSecurityTrustHtml(merged.join(' '))
  }

  performSearch (term) {
    this.searchService.search(term).then(results => {
      this.result = results.toString()
      this.generateHighlights('brands', results)
    })
  }

}

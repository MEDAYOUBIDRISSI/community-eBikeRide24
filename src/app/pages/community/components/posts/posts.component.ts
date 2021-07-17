import { Component, OnInit } from '@angular/core';
import { PostServiceService } from './post-service.service';

@Component({
  selector: 'ngx-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  
  firstCard = { 
    news: [],
    placeholders: [], 
    loading: false,
    pageToLoadNext: 1,
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  constructor(private PostService: PostServiceService) {}
  ngOnInit(): void {
  }
 

  loadNext(cardData) {
    if (cardData.loading) { return; }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.PostService.load(cardData.pageToLoadNext, this.pageSize)
      .subscribe(nextNews => {
        console.log(nextNews)
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }

}

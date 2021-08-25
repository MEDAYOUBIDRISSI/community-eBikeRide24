import { Component, OnInit } from '@angular/core';
import { PostServiceService } from './post-service.service';
import { NbDialogService } from '@nebular/theme';
import { NewPostComponent } from '../new-post/new-post.component';
import { Router } from '@angular/router';

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

  constructor(private PostService: PostServiceService,private dialogService: NbDialogService,private router: Router) {}
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

  open() {
    this.dialogService.open(NewPostComponent)
      .onClose.subscribe(result => {
        if(result=="goode_Jobe")
        {
          this.reloadComponent()
        }
      });
  }

  reloadComponent() 
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}

import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-news-posts-placeholder',
  templateUrl: './news-posts-placeholder.component.html',
  styleUrls: ['./news-posts-placeholder.component.scss']
})
export class NewsPostsPlaceholderComponent  {

  @HostBinding('attr.aria-label')
  label = 'Loading';

  constructor() { }

}

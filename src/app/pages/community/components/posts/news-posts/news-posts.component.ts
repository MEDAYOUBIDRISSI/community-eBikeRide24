import { Component ,Input,OnInit,ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { PostServiceService,NewsPost ,User} from '../post-service.service';
@Component({
  selector: 'ngx-news-posts',
  templateUrl: './news-posts.component.html',
  styleUrls: ['./news-posts.component.scss']
})
export class NewsPostsComponent implements OnInit{

  @Input() post: NewsPost
  _id:any
  public User: User={}
  @ViewChild('item') accordion;
  @ViewChild('item2') accordion2;

  toggle() {
    this.accordion.toggle();
  }
  toggle2() {
    this.accordion2.toggle();
  }

  constructor(private PostService: PostServiceService) { }
  ngOnInit(): void {
    this._id = localStorage.getItem('jwt-IDUser')
  }

  getUserAuth(){
    this.PostService.getUserAuth(this._id).subscribe(data => {
      this.User = data.User;
      console.log(this.User)
    });
  }

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

}

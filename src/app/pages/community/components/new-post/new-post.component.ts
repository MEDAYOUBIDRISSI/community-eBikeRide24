import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostServiceService,NewsPost ,User} from '../posts/post-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();
  textareaItemFormControl = new FormControl();
  _id:any

  User:User={}
  postSample:NewsPost={typePost:"PostSample",user:this.User}
  postAnnonce:NewsPost={typePost:"PostAnnonce",user:this.User}
  constructor(private PostService:PostServiceService,private router: Router) { }

  ngOnInit(): void {

    this._id = localStorage.getItem('jwt-IDUser')
      this.getUserAuth()
  }

  getUserAuth(){
    this.PostService.getUserAuth(this._id).subscribe(data => {
      this.User = data.User;
    });
  }

  savePostSample()
  {
    this.postSample.user=this.User
    this.PostService.createPost(this.postSample).subscribe( data =>{
      this.postSample={typePost:"PostSample",user:this.User}
      window.location.reload(); 
    },
    error => console.log(error));
  }
  savePostAnnonce()
  {
    this.postAnnonce.user=this.User
    this.PostService.createPost(this.postAnnonce).subscribe( data =>{
      console.log(data);
      this.postAnnonce={typePost:"PostAnnonce",user:this.User}
      this.reloadComponent() 
    },
    error => console.log(error));
  }
  reloadComponent() 
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

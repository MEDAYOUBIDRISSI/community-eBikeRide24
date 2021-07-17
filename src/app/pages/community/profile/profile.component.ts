import { Component, OnInit } from '@angular/core';
import { PostServiceService,NewsPost ,User} from '../components/posts/post-service.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  _id:any
  User:User={}

  constructor(private PostService: PostServiceService) {}

  ngOnInit(): void {

    this._id = localStorage.getItem('jwt-IDUser')
      this.getUserAuth()
  }

  getUserAuth(){
    this.PostService.getUserAuth(this._id).subscribe(data => {
      this.User = data.User;
      console.log(this.User)
    });
  }

  updateProfile()
  {
    console.log(this.User)
    this.PostService.updateProfile(this._id, this.User).subscribe( data =>{
      alert("Bien Update")
      window.location.reload(); 
    }, error => console.log(error));
  }

  selectFiles(e:any)
    {
      var reader=new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload=(event:any)=>{
        this.User.imgProfile=event.target.result
     }
    }

    delete_img()
    {
      this.User.imgProfile="assets/images/avatars/inconnu.jpg";
    } 

}

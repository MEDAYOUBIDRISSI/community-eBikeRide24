import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostServiceService,NewsPost ,User} from '../posts/post-service.service';
import { NbDialogService } from '@nebular/theme';
import { MapRoutingComponent } from '../maps-leaflet/map-routing/map-routing.component';
import { Trip } from '../maps-leaflet/map-routing/trip.class'

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
  urls=[];
  imagesUpload:string[]=[]
  imagesInsert:string[]=[]

  User:User={}
  postSample:NewsPost={typePost:"PostSample",user:this.User}
  postAnnonce:NewsPost={typePost:"PostAnnonce",user:this.User}
  constructor(private PostService:PostServiceService,private router: Router,private dialogService: NbDialogService) { }

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
    this.postAnnonce.startTripeLat=localStorage.getItem("startTripeLat");
    this.postAnnonce.startTripeLng=localStorage.getItem("startTripeLng");
    this.postAnnonce.endTripeLat=localStorage.getItem("endTripeLat");
    this.postAnnonce.endTripeLng=localStorage.getItem("endTripeLng");

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
  open() {
    this.dialogService.open(MapRoutingComponent)
      .onClose.subscribe(result => {
          console.log(result)
      });
  }

  // selectFiles(e)
  //   {
  //     this.urls=[]
  //     if(e.target.files)
  //     {
  //       for(var i=0;i<File.length;i++)
  //       {
  //         var reader=new FileReader()
  //         reader.readAsDataURL(e.target.files[i])
  //         reader.onload=(events:any)=>{
  //           this.urls.push(events.target.result)
  //         }
  //       }
  //     }
  //     console.log(this.urls)
  //   }

  //   delete_img(url:any)
  //   {
  //       const index: number = this.urls.indexOf(url);
  //       this.urls.splice(index, 1);
  //   }
}

import { Component ,Input,OnInit,OnDestroy,ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PostServiceService,NewsPost ,User, comment} from '../post-service.service';
import { NbDialogService } from '@nebular/theme';
import { MapInteneraryComponent } from '../../maps-leaflet/map-intenerary/map-intenerary.component';
import { Camera, SecurityCamerasData } from '../../../../../@core/data/security-cameras';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-news-posts',
  templateUrl: './news-posts.component.html',
  styleUrls: ['./news-posts.component.scss']
})
export class NewsPostsComponent implements OnInit,OnDestroy{

  @Input() post: NewsPost
  _id:any
  User: User={}
  comment: comment={}
  Comment_v:string
  PostUpdated:NewsPost
  @ViewChild('item') accordion;
  @ViewChild('item2') accordion2;

  readMore = false;
  VerificationEtat:boolean=false;
  // comment:{userComment:User,comment:string}

  private destroy$ = new Subject<void>();

  cameras: Camera[];
  selectedCamera: Camera;
  newImage: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';
  ////////

  toggle() {
    this.accordion.toggle();
  }
  toggle2() {
    this.accordion2.toggle();
  }

  constructor(private PostService: PostServiceService,
    private dialogService: NbDialogService,
    private securityCamerasService: SecurityCamerasData,) { }
  ngOnInit(): void {
    this._id = localStorage.getItem('jwt-IDUser')
    this.getUserAuth()
    this.VerifiedEtat()
    ////////////////////////
    this.securityCamerasService.getCamerasData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cameras: Camera[]) => {
        this.cameras = cameras;
      });
          for(var i=0;i<4;i++)
          {
            if(this.post.Images[i])
            {
              this.cameras[i].source=this.post.Images[i]
                if(i==0)
                {
                  this.selectedCamera = this.cameras[i];
                }
            }
            else{
              this.cameras.splice(i, 1);
            }
            
          }
  }

  getUserAuth(){
    this.PostService.getUserAuth(this._id).subscribe(data => {
      this.User = data.User;
    });
  }

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  open() {
    localStorage.setItem("Display_startTripeLat",this.post.startTripeLat);
    localStorage.setItem("Display_startTripeLng",this.post.startTripeLng);
    localStorage.setItem("Display_endTripeLat",this.post.endTripeLat);
    localStorage.setItem("Display_endTripeLng",this.post.endTripeLng);
    this.dialogService.open(MapInteneraryComponent)
      .onClose.subscribe(result => {
        localStorage.removeItem("Display_startTripeLat");
        localStorage.removeItem("Display_startTripeLng");
        localStorage.removeItem("Display_endTripeLat");
        localStorage.removeItem("Display_endTripeLng");
      });
  }

  JoinPost()
  {
    this.post.affiliateDrivers.push(this.User)
    this.PostService.JoinPost(this.post._id, this.post).subscribe( data =>{
      this.VerificationEtat=true
    }, error => console.log(error));
  }

  LeavePost()
  {
    const index: number = this.post.affiliateDrivers.indexOf(this.User);
    this.post.affiliateDrivers.splice(index, 1);
    this.PostService.JoinPost(this.post._id, this.post).subscribe( data =>{
      this.VerificationEtat=false
    }, error => console.log(error));
  }

  VerifiedEtat()
  {
    for(var i=0;i<this.post.affiliateDrivers.length;i++)
      {
          if(this.post.affiliateDrivers[i]==this.User)
          {
            this.VerificationEtat=true
          }
      }
  }

  createComment()
  {
    this.comment.userComment=this.User
    this.comment.fullName=this.User.nom +" "+this.User.prenom
    this.comment.imgProfile=this.User.imgProfile
    this.comment.comment=this.Comment_v
    this.post.comments.push(this.comment)
    
    this.PostService.JoinPost(this.post._id, this.post).subscribe( data =>{
      this.Comment_v=""
      console.log(data)
    }, error => console.log(error));
  }

  InterestPost()
  {
    this.post.reacteds.push(this.User)
    this.PostService.JoinPost(this.post._id, this.post).subscribe( data =>{
      this.VerificationEtat=true
    }, error => console.log(error));
  }
  NotInterestPost()
  {
    const index: number = this.post.reacteds.indexOf(this.User);
    this.post.reacteds.splice(index, 1);
    this.PostService.JoinPost(this.post._id, this.post).subscribe( data =>{
      this.VerificationEtat=false
    }, error => console.log(error));
  }

  //////////////////////////


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }
 
}

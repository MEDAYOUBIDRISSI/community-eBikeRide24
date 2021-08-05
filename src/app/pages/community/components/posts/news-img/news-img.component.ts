import { Component, OnInit ,Input} from '@angular/core';
import { NbDialogService,NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-news-img',
  templateUrl: './news-img.component.html',
  styleUrls: ['./news-img.component.scss']
})
export class NewsImgComponent implements OnInit {

  _imgDisplay:any=localStorage.getItem("img_dialog");
  constructor(public ref: NbDialogRef<NewsImgComponent>) { }

  ngOnInit(): void {
    localStorage.removeItem("img_dialog");
  }

}

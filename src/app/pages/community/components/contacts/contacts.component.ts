import { Component, OnInit } from '@angular/core';
import { ProductServiceService,} from '../top-seller/product-service.service';

@Component({
  selector: 'ngx-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  Players:any[]=[]

  constructor(private ProductService: ProductServiceService) {}

  ngOnInit(): void {
    this.getPlayers()
  }
  getPlayers(){
    this.ProductService.getPlayers().subscribe(data => {
      this.Players = data;
      console.log(this.Players)
    });
  }

}

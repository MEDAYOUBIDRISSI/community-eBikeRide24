import { Component, OnInit } from '@angular/core';
import { ProductServiceService,} from './product-service.service';

@Component({
  selector: 'ngx-top-seller',
  templateUrl: './top-seller.component.html',
  styleUrls: ['./top-seller.component.scss']
})
export class TopSellerComponent implements OnInit {

  Products:any[]=[]

  constructor(private ProductService: ProductServiceService) {}

  ngOnInit(): void {
    this.getTopSeller()
  }
  getTopSeller(){
    this.ProductService.getTopSeller().subscribe(data => {
      this.Products = data;
      console.log(this.Products)
    });
  }

}

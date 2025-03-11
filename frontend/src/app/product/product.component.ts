import { Component, Input } from '@angular/core';
import { Product } from '../world';
import { WebserviceService } from '../webservice.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  protected server: string;
  product: Product = new Product();
  constructor(private service: WebserviceService) {
    this.server = service.server + '/'
  }

  @Input()
  set prod(value: Product) {
 
    this.product = value;
    console.dir(value)
  }
}


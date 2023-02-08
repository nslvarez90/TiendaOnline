import { Product } from './../../models/product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() icon: string | null = null;
  @Output() productPos = new EventEmitter<any>();
  public color:string="#66ccff"
  constructor() { }

  ngOnInit(): void {
  }
   /**
   * add new musician
   * @param value
   */
   addProductToCart() {
    this.productPos.emit(this.product.id);
  }
}

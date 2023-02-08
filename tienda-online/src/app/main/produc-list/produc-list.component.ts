import { ConvertService } from './../../services/convert.service';
import { CONSTANTS } from './../../app.constans';
import { UtilityService } from './../../services/utility.service';
import { Invoive } from './../../models/invoice.model';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Award } from 'ng-bootstrap-icons/icons';

@Component({
  selector: 'app-produc-list',
  templateUrl: './produc-list.component.html',
  styleUrls: ['./produc-list.component.css']
})
export class ProducListComponent implements OnInit {
  public title: string = "List of products"
  public isReady: boolean = false
  public paymentReady: boolean = true
  public productIcons: Array<string> = CONSTANTS.ICONS
  public productList: Array<Product> = []
  public productUrl: string = './assets/products.json'
  public cartTotal: number = 0
  public currentInvoice: Array<Product> = []
  constructor(
    private _products: ProductService,
    private _utilityService: UtilityService,
    private _convertService: ConvertService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('PRODUCTS')) {
      this.productList = JSON.parse(localStorage.getItem('PRODUCTS') ? localStorage.getItem('PRODUCTS') : "[]");
      this.currentInvoice = JSON.parse(localStorage.getItem('INVOICE') ? localStorage.getItem('INVOICE') : "[]")
      this.cartTotal = this.currentInvoice.length;
      this.isReady = true
    }
    else {
      this._products.getAllProduct(this.productUrl).subscribe({
        next: (v) => {
          this.productList = v;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.isReady = true
          //console.log(this.productList)
        }
      })
    }

  }
  addToCart(index: any) {
    console.log(index);
    let pos = parseInt(index) - 1;
    if (this.productList[pos].total_aviable > 0) {
      this.productList[pos].total_aviable--;
      localStorage.setItem('PRODUCTS', JSON.stringify(this.productList));
      this.currentInvoice.push(this.productList[pos]);
      localStorage.setItem('INVOICE', JSON.stringify(this.currentInvoice));
      this.cartTotal = this.currentInvoice.length;
    }
    else {
      this._utilityService.getNotificationWarning("Product out of stock")
    }
  }
  changeCurrency(e) {
    console.log(e.target.value)
    let to = e.target.value;
    this.productList.map(async (product) => {
      if (product.currency !== to) {
        await this._convertService.convertAmount(to, product.currency, product.price).subscribe({
          next: (v) => {
            console.log(v)
            product.currency=to
            product.price=v.result
          },
          error: (e) => console.error(e),
          complete: () => {
            //console.log(this.productList)
          }
        });
      }
    })
  }
}

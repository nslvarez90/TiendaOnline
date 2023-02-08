import { CONSTANTS } from './../../app.constans';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public totalProducts: number = 0
  public totalAmount: number = 0
  public productToBuy: Array<Product> = [];
  public productsAgregate: Array<any> = [];
  public isReady: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.productToBuy = JSON.parse(localStorage.getItem('INVOICE') ? localStorage.getItem('INVOICE') : "[]");
    this.totalProducts = this.productToBuy.length
    this.fillCartList()
    console.log(this.productsAgregate)
    this.isReady = true
  }

  fillCartList() {
    this.productsAgregate = []
    this.totalAmount = 0
    this.productToBuy.map(product => {
      const i = this.productsAgregate.findIndex(e => e.id === product.id)
      if (i > -1) {
        this.productsAgregate[i].cuantity++;
        this.productsAgregate[i].amomount = product.price * this.productsAgregate[i].cuantity;
      }
      else {
        this.productsAgregate.push({
          id: product.id,
          name: product.name,
          description: product.description,
          cost: product.price,
          cuantity: 1,
          amomount: product.price,
          icon: CONSTANTS.ICONS[parseInt(product.id) - 1]
        })
      }
      this.totalAmount = Number(this.totalAmount) + Number(product.price);
    })
  }
  removeOne(id: any) {
    const i = this.productToBuy.findIndex(e => e.id === id)
    console.log(i);
    this.productToBuy.splice(i, 1);
    localStorage.setItem('INVOICE', JSON.stringify(this.productToBuy));
    this.updateTotal(id);
    this.fillCartList()
  }

  updateTotal(id: any) {
    let productTemp=JSON.parse(localStorage.getItem('PRODUCTS'));
    const i = productTemp.findIndex(e => e.id === id)
    productTemp[i].total_aviable++;
    localStorage.setItem('PRODUCTS', JSON.stringify(productTemp));
  }


}

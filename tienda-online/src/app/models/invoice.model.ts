/**
* @author Nelson Sánchez Alvarez
* @date 2023/02/07
*/
export class Product {
    constructor(
      public id?: string,      
      public products ?: Array<Product>,  
      public amount?: number,
    ) { }
  }
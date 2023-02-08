import { Product } from './product.model';
/**
* @author Nelson Sánchez Alvarez
* @date 2023/02/07
*/
export class Invoive {
    constructor(
      public id?: string,      
      public products ?: any,  
      public amount?: number,
    ) { }
  }
/**
* @author Nelson Sánchez Alvarez
* @date 2023/02/07
*/
export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public category?: string,
    public description?: string,
    public price?: number,
    public currency?: string,
  ) { }
}
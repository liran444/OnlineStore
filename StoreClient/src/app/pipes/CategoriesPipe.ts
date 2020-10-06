import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../models/Product";

@Pipe({
  name: "categoriesPipe",
})
export class CategoriesPipe implements PipeTransform {
  /**
  * Filters products array by category id
  * @param products - an array containing all Products
  * @param id - the id of a category
  */
  transform(products: Product[], id: number): any {
    if (id === 0) {
      return products;
    } else {
      return products.filter((product) => {
        return product.category_id === id;
      });
    }
  }
}

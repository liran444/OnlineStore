import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../models/Product";

@Pipe({
  name: "subTextPipe",
})
export class ProductsPipeBySubtext implements PipeTransform {
  /**
   * Filters products array by product name
   * @param products - an array containing all Products
   * @param subText - a string which is used to filter the array by name
   */
  transform(products: Product[], subText: string): any {
    return products.filter((todo) =>
      todo.name.toLowerCase().includes(subText.toLowerCase())
    );
  }
}

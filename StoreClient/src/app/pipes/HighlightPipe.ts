import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../models/Product";

@Pipe({
  name: "highlightPipe",
})
export class HighlightPipe implements PipeTransform {
  /**
   * Filters products array by product name
   * @param products - an array containing all Products
   * @param subText - a string which is used to filter the array by name
   */
  transform(item: string, subText: string): any {
    const re = new RegExp(subText, "gi");
    return item.replace(re, `<span class='highlight'>${subText}</span>`);
  }
}

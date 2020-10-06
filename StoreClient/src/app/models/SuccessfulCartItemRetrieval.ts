export class SuccessfulCartItemRetrieval {
  public constructor(
    public cart_total_price?: number,
    public product_id?: number,
    public name?: string,
    public amount?: number,
    public price?: number,
    public total_price?: number,
    public category_id?: number
  ) {}
}

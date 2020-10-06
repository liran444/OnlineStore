export class Order {
  public constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public cart_item?: string,
    public amount?: number,
    public product_price?: number,
    public product_total_price?: number,
    public cart_total_price?: number,
    public ship_city?: string,
    public ship_address?: string,
    public ship_date?: string,
    public order_date?: string,
    public last_digits?: number
  ) {}
}

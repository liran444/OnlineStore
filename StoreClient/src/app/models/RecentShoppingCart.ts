export class RecentShoppingCart {
  public constructor(
    public timestamp?: string,
    public cart_total_price?: number,
    public is_checked_out?: number,
    public last_order_date?: string
  ) {}
}

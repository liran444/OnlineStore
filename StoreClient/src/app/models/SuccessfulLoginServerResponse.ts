export class SuccessfulLoginServerResponse {
  public constructor(
    public token?: string,
    public firstname?: string,
    public user_type?: string,
    public city_id?: number,
    public street?: string,
    public last_open_cart_date?: string,
    public cart_total_price?: number,
    public is_checked_out?: number,
    public last_order_date?: string
  ) {}
}

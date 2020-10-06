export class AddOrder {
  public constructor(
    public city_id?: number,
    public street?: string,
    public ship_date?: string,
    public last_digits?: number
  ) {}
}

export class Product {
  public constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public amount?: number,
    public category_name?: string,
    public category_id?: number,
    public image_file_name?: string,
    public is_new_name?: boolean
  ) {}
}

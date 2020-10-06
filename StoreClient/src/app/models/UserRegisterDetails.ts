export class UserRegisterDetails {
  public constructor(
    public social_number?: number,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public city_id?: number,
    public street?: string
  ) {}
}

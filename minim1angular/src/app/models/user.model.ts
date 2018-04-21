export class User {

  public _id: number;
  constructor(
    public name: string,
    public surname: string,
    public password: string,
    public role: string,
    public state: Boolean,
  ) {}

}


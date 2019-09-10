export interface ICustomUser {
  id?: number;
}

export class CustomUser implements ICustomUser {
  constructor(public id?: number) {}
}

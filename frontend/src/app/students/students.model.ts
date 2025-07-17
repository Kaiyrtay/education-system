import { User } from '../users/user.modal';

export class Student {
  constructor(
    public id: number | null,
    public user: User,
    public group?: number
  ) {}
}

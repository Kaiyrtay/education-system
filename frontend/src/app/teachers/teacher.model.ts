import { User } from '../users/user.modal';

export class Teacher {
  constructor(public id: number | null, public user: User) {}
}

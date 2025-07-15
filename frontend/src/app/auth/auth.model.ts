export class LoginRequest {
  constructor(public username: string = '', public password: string = '') {}
}

export class LoginResponse {
  constructor(public access: string = '', public refresh: string = '') {}
}

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {}

  getAuthorizationToken() {
    return 'Bearer 1980cb22ea6668c23f88dd85d2d65a09677c6da2';
  }
}

import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._email = "";
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setEmail(email) {
    this._email = email;
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get email() {
    return this._email;
  }
}

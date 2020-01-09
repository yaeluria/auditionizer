import { observable, decorate } from 'mobx';

class AuthStore {
  loggedIn = false;
  user = null;
  openLogin = false;
}
decorate(AuthStore, {
    loggedIn: observable,
    user: observable,
    openLogin: observable
  });
export default new AuthStore();
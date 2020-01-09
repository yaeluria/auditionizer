import { observable, decorate } from 'mobx';

class AuthStore {
  loggedIn = false;
  user = null;
}
decorate(AuthStore, {
    loggedIn: observable,
    user: observable,
  });
export default new AuthStore();
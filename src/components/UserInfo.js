export default class UserInfo {
  constructor({ profileTitle, profileSubtitle }) {
    this._title = document.querySelector(profileTitle);
    this._subTitle = document.querySelector(profileSubtitle);
  }

  getUserInfo() {
    const userInfo = {
      username: this._title.textContent,
      userinfo: this._subTitle.textContent,
    };

    return userInfo
  }

  setUserInfo({ name, info }) {
    this._title.textContent = name;
    this._subTitle.textContent = info;
  }
}
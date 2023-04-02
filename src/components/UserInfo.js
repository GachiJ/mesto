export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, avatarSelector }) {
    this._title = document.querySelector(profileTitle);
    this._subTitle = document.querySelector(profileSubtitle);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      username: this._title.textContent,
      userinfo: this._subTitle.textContent,
    };

    return userInfo
  }

  setUserInfo({ name, about, avatar }) {
    this._title.textContent = name;
    this._subTitle.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
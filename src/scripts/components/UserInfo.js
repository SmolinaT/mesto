export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._name = profileName;
    this._about = profileJob;
    this._avatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
  
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
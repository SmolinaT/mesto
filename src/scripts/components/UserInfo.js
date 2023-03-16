export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._name = profileName;
    this._job = profileJob;
    this._avatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    }
  }

  setUserInfo(name, job, avatar) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.src = avatar;
  }
}
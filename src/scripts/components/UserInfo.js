export default class UserInfo {
  constructor(profileName, profileJob) {
    this._name = profileName;
    this._job = profileJob;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    }
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
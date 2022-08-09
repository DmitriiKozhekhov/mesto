export default class UserInfo {
  constructor(nameAuthor, infoAuthor) {
    this._nameAuthor = nameAuthor;
    this._infoAuthor = infoAuthor;
  }
  getUserInfo() {
    this._userInfoValues = {
      nameAuthor: this._nameAuthor.textContent,
      infoAuthor: this._infoAuthor.textContent,
    };
    return this._userInfoValues;
  }
  setUserInfo(nameAuthor, infoAuthor) {
    this._nameAuthor.textContent = nameAuthor;
    this._infoAuthor.textContent = infoAuthor;
  }
}

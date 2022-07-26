export default class UserInfo {
  constructor({ nameAuthor, infoAuthor }) {
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
  setUserInfo(newData) {
    this._nameAuthor.textContent = newData.nameAuthor;
    this._infoAuthor.textContent = newData.infoAuthor;
  }
}

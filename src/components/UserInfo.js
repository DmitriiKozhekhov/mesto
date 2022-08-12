export default class UserInfo {
  constructor(nameAuthor, infoAuthor, avatarAuthor) {
    this._nameAuthor = nameAuthor;
    this._infoAuthor = infoAuthor;
    this._avatarAuthor = avatarAuthor;
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
  editAvatar(elem) {
    this._avatarAuthor.src = elem.avatar;
  }
}

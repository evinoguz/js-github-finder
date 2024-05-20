export class Github {
  constructor() {
    this.client_id = "b0807f0800b388474f29";
    this.client_secret = "213e3a0dd885d7805a7e0c99c83bd3f7721279c6";
    this.per_page = 10;
    this.sort = "asc";
  }
  //! Apiden kullanıcı bilgilerini alma
  async fetchUserData(username) {
    //! Aratılan kullanıcının bilgileri
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    // console.log(profileRes)

    //! Aratılan kullanıcının repoları
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`
    );

    //! Apiden gelen cevabı json yapısına çevirir
    const data = await profileRes.json();
    const repos = await repoRes.json();
    return { data, repos };
  }
}

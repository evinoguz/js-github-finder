import { elements } from "./helpers.js";

export class UI {
  constructor() {
    this.profile = elements.profile;
    this.btnClear = elements.btnClear;
    this.searchInput = elements.searchInput;
    this.btnDark = elements.btnDark;
    this.body = elements.body;
    this.repos = elements.repos;
    //! olay izleyicileri
    this.btnClear.addEventListener("click", this.clearProfile.bind(this));
    this.btnDark.addEventListener("click", this.darkMode.bind(this));
  }
  //! User-İnfo
  renderProfile(res) {
    const created_at = new Date(res.created_at).toLocaleDateString();
    this.profile.innerHTML = `
        <div class="row border p-4 my-4 rounded-3">
        <div class="col-md-3">
          <img
            class="img-fluid rounded shadow"
            src="${res.avatar_url}"
            alt=""
          />
          <a href="${res.html_url}" target="_blank" class="btn btn-primary w-100 mt-4">Profili Göster</a>
        </div>
        <div class="col-md-9 gap-3" id="profileButton">
          <span class="badge fs-6 bg-primary">Açık Repolar: ${res.public_repos}</span>
          <span class="badge fs-6 bg-secondary">Açık Gistler: ${res.public_gists}</span>
          <span class="badge fs-6 bg-success">Takipçiler: ${res.followers} </span>
          <span class="badge fs-6 bg-info">Takip Edilenler: ${res.following} </span>

          <ul class="list-group mt-3">
            <li class="list-group-item">Hakkında: ${res.bio}</li>
            <li class="list-group-item">Şirket: ${res.company}</li>
            <li class="list-group-item">Website: ${res.blog}</li>
            <li class="list-group-item">Konum: ${res.location}</li>
            <li class="list-group-item">Hesap Oluşturma: ${created_at}</li>
          </ul>
        </div>
      </div>
        `;
  }
  //! Uyarı mesajı oluşturma
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = message;
    elements.warning.appendChild(div);
    //! Uyarı mesajını 3sn gösterir
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  //! Uyarı mesajını silme
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  //! Arama sonucunu silme ve bildirim basma
  clearProfile(e) {
    e.preventDefault();
    if (confirm("Silmek istediğinize emin misiniz?")) {
      this.profile.innerHTML = "";
      this.searchInput.value = "";
      this.showAlert("Başarıyla silindi.", "alert alert-info");
      this.repos.innerHTML = "";
    }
  }
  //! Dark mode- Light mode
  darkMode() {
    if (this.body.classList.contains("bg-dark")) {
      this.body.className = "bg-light text-bg-light";
      this.btnDark.className = "btn btn-dark";
      this.btnDark.textContent = "Dark Mode";
    } else {
      this.body.className = "bg-dark text-bg-dark";
      this.btnDark.className = "btn btn-light";
      this.btnDark.textContent = "Light Mode";
    }
    elements.title.classList.toggle("text-dark");
  }
  renderProjects(data) {
    data.forEach((repo) => {
      this.repos.innerHTML += `
    <div class="border row p-3 mb-3">
      <div class="col-6">
        <a href="" target="_blank">${repo.name}</a>
      </div>
      <div class="col-6">
        <span class="badge bg-secondary">Yıldız: ${repo.stargazers_count}</span>
        <span class="badge bg-primary">Fork: ${repo.forks_count}</span>
        <span class="badge bg-success">İzleyenler: ${repo.watchers}</span>
      </div>
  </div>
  `;
    });
  }
  searchClear(){
    console.log(this.profile.innerHTML)
    this.profile.innerHTML = "";
    this.repos.innerHTML = "";
  }
}

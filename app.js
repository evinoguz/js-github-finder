import { Github } from "./scripts/api.js";
import { elements } from "./scripts/helpers.js";
import { UI } from "./scripts/ui.js";

// Miras alma. Bir sınıfın örneğini oluşturma
const github = new Github();
// UI class ının örneği
const ui = new UI();
github.fetchUserData()
const getInput = (e) => {
  e.preventDefault();
  const value = elements.searchInput.value;
  if (value == "") {
    ui.showAlert("Kullanıcı adını doldurunuz", "alert alert-warning")
    ui.searchClear();
    return;
  }
  if (value) {
    github
      .fetchUserData(value)
      .then((res) => {
        console.log("resMsj: " + res.data.message)
        if (res.data.message === "Not Found") {
            ui.showAlert(
            "Aradığınız kullanıcı bulunamadı.",
            "alert alert-danger"
          );
          ui.searchClear();
        } else {
            ui.showAlert("Kullanıcı bulundu.", "alert alert-success");
            ui.searchClear();
            ui.renderProfile(res.data);
            ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));
      return;
  }
};
//! Olay İzleyicileri
elements.searchBtn.addEventListener("click", getInput);

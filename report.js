window.addEventListener("load", function () {
  async function loadReports() {
    var users;
    await fetch("http://localhost:8000/Users", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (users = data));

    var surveys = ``;
    var ratings = ``;
    users.map((user) => {
      surveys += `<a class="list-group-item">${user.firstName}</a>`;
      ratings += `<a class="list-group-item">${user.firstName}</a>`;
    });
    document.querySelector("#surveys").innerHTML = surveys;
    document.querySelector("#ratings").innerHTML = ratings;
  }

  loadReports();
});

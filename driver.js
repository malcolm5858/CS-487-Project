window.addEventListener("load", function () {
  var drives;
  const button = document.getElementById("LookforRider");
  async function LookForRiders() {
    var drivers;
    await fetch("http://localhost:8000/Drives", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => (drives = data));
    var list = ``;
    await fetch("http://localhost:8000/DrivesDrivers", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => (drivers = data));

    drives.map((drive, index) => {
      //const user;
      //fetch(`http://localhost:8000/GetUserID/${drive.user_id}`);

      if (index == 0) {
        list += `<a class="list-group-item active" aria-current="true">${drivers[index].firstName}</a>`;
      } else {
        list += `<a class="list-group-item" aria-current="true">${drivers[index].firstName}</a>`;
      }
    });
    document.querySelector("#list-group").innerHTML = list;
  }

  async function onLoad() {
    var user;
    await fetch("http://localhost:8000/GetUser", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => (user = data));

    document.querySelector(
      `#title`
    ).innerHTML = `<h1 style="text-align: center">Driver: ${user.firstName}</h1>`;
  }
  onLoad();
  button.addEventListener("click", function () {
    LookForRiders();
  });
});

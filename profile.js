async function profileInfoOnLoad() {
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
    `#nameoutput`
  ).innerHTML = `<h2 class="center"> ${user.firstName} ${user.lastName}</h2>`;
  document.querySelector(
    `#phoneNum`
  ).innerHTML = `<input id="phoneNum" name="phone" placeholder="${user.Phone}" />`;
  document.querySelector(
    `#email`
  ).innerHTML = `<input id="email" name="email" placeholder="${user.email}" />`;
  document.querySelector(
    `#address`
  ).innerHTML = `<input id="address" name="address" placeholder="${user.address}" />`;
}
profileInfoOnLoad();

window.addEventListener("load", function () {
  const form = document.getElementById("formSignIn");
  async function Login() {
    var formEl = document.forms.formSignIn;
    var formData = new FormData(formEl);
    var username = formData.get("email_field");
    var password = formData.get("password_field");
    const url = "http://localhost:8000/Login";

    const body = {
      username: username,
      password: password,
    };
    var token;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => (token = data.accessToken));
    if (token != "password mismatch") {
      localStorage.setItem("token", token);
      window.location.href = "index.html";
    } else {
      window.location.href = "signin.html";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    Login();
  });
});

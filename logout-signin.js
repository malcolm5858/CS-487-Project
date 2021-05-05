window.addEventListener("load", function () {
  function renderLoginButton() {
    const formId = "#signInSignup";

    if (localStorage.getItem("token") != null) {
      document.querySelector(
        formId
      ).innerHTML = `<Button class="btn btn-light" onClick="logout()"
          >Log Out</Button>`;
    } else {
      document.querySelector(
        formId
      ).innerHTML = `<a class="btn btn-light" role="button" href="signin.html"
        >Sign In</a
      >
      <a class="btn btn-dark" role="button" href="signup.html">Sign Up</a>`;
    }
  }

  renderLoginButton();
});

function logout() {
  localStorage.removeItem("token");
  renderLoginButton();
}

function renderLoginButton() {
  const formId = "#signInSignup";

  if (localStorage.getItem("token") != null) {
    document.querySelector(
      formId
    ).innerHTML = `<Button class="btn btn-light" onClick="logout()"
          >Log Out</Button>`;
  } else {
    document.querySelector(
      formId
    ).innerHTML = `<a class="btn btn-light" role="button" href="signin.html"
        >Sign In</a
      >
      <a class="btn btn-dark" role="button" href="signup.html">Sign Up</a>`;
  }
}

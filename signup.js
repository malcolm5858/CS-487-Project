window.addEventListener("load", function () {
  const form = document.getElementById("formSignup");
  async function submitForm() {
    var formEl = document.forms.formSignup;
    var formData = new FormData(formEl);
    var firstName = formData.get("firstName");
    var lastName = formData.get("lastName");
    var Username = formData.get("Username");
    var Password = formData.get("Password");
    var email = formData.get("email");
    var address = formData.get("address") + formData.get("address2");
    var country = formData.get("country");
    var state = formData.get("state");
    var zip = formData.get("zip");
    var cc_name = formData.get("cc-name");
    var cc_number = formData.get("cc-number");
    var cc_cvv = formData.get("cc-cvv");
    var cc_expiration = formData.get("cc-expiration");
    var Phone = formData.get("Phone");

    let output = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      Username: Username,
      Password: Password,
      Address: address,
      Country: country,
      State: state,
      zip: zip,
      NameOnCard: cc_name,
      CardNumber: cc_number,
      Expiration: cc_expiration,
      cvv: cc_cvv,
      Phone: Phone,
    };

    await fetch("http://localhost:8000/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(output),
    });
    window.location.href = "index.html";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
  });
});

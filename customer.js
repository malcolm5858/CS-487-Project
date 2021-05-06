window.addEventListener("load", function () {
  const form = document.getElementById("formAddlocation");
  var directionsService;
  var directionsRenderer;
  function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom: 7,
      center: chicago,
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);
  }

  //google.maps.event.addDomListener(window, 'load', initMap);

  async function makeNew(drive) {
    await fetch("http://localhost:8000/newDrive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(drive),
    });
  }

  async function submitForm() {
    var formEl = document.forms.formAddlocation;
    var formData = new FormData(formEl);
    const user = await getUser();

    //Get Form elements
    const startLocation = formData.get("pickup-loc");
    const endLocation = formData.get("drop-off");

    const price = "$20.00";
    const waitTime = "1 Hr";

    const drive = {
      user_id: user.id,
      startLocation: startLocation,
      endLocation: endLocation,
      price: price,
      waitTime: waitTime,
    };

    await makeNew(drive);
  }

  async function loadPage() {
    const user = await getUser();

    document.querySelector(
      "#Title"
    ).innerHTML = `<h1>Customer: ${user.firstName}</h1>`;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
  });

  loadPage();
});

reload();
setInterval(reload, 5000);

async function reload() {
  var drives = [];
  await fetch("http://localhost:8000/GetDrives", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => (drives = data));

  const drive = drives[0];
  console.log(drive);
  if (drive.drive_id != null) {
    const html = `<h2> Ride Found</h2>
      <div id ="map">
      </div>
      <div class="estimation">
        <p>Estimated Total: <output>${drive.price}</output></p>
        <p>Estimated Time: <output>${drive.waitTime}</output></p>
        <a href="profile.html">Edit Wallet</a>
      </div>
      <div class = "driverProfile">
        <a href="profileDri.html">View Driver Profile</a>
      </div>`;

    document.querySelector("#box-two").innerHTML = html;
  }
}

async function getUser() {
  var user;
  await fetch("http://localhost:8000/GetUser", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => (user = data));

  return user;
}

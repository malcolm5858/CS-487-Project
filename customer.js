window.addEventListener("load", function () {
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
    var formEl = document.forms;

    const user = getUser();

    //Get Form elements
    const startLocation = "";
    const endLocation = "";

    const price = "$20.00";
    const waitTime = "1 Hr";

    const drive = {
      user_id: user.id,
      startLocation: startLocation,
      endLocation: endLocation,
      price: price,
      waitTime: waitTime,
      drive_id: null,
    };

    await makeNew(drive);
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
});

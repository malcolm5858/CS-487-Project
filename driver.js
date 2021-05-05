window.addEventListener("load", function () {
  var drives;
  const button = document.getElementById("LookforRider");
  var directionsService;
  var directionsRenderer;
  async function LookForRiders() {
    var selectedIndex = 0;
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
    drives.map((_, index) => {
      if (index == 0) {
        list += `<a class="list-group-item list-group-item-action active " aria-controls="${drivers[index].firstName}" role="tab" aria-current="true" data-bs-toggle="list" id="myTab-${drivers[index].firstName}">${drivers[index].firstName}</a>`;
      } else {
        list += `<a class="list-group-item list-group-item-action " role="tab" aria-controls="${drivers[index].firstName}" aria-current="true" data-bs-toggle="list" lid="myTab-${drivers[index].firstName}">${drivers[index].firstName}</a>`;
      }
    });
    document.querySelector("#list-tab").innerHTML = list;

    document.querySelector("#mapRapper").innerHTML = `<div id="map"></div>`;

    document.querySelector(
      "#card"
    ).innerHTML = ` <h5 class="card-title">Driver: ${
      drivers[selectedIndex].firstName + " " + drivers[selectedIndex].lastName
    }</h5>
    <p class="card-text">From: ${drives[selectedIndex].startLocation} to: ${
      drives[selectedIndex].endLocation
    }</p>
    <a href="#" class="btn btn-primary">Drive for ${
      drivers[selectedIndex].firstName
    }</a>`;
    setTimeout(() => {
      var bob = document.querySelector("#myTab-BOB");
      alert(bob);
    }, 2000);
    //var triggerTabList = [].slice.call(document.querySelectorAll("#myTab-BON"));

    // triggerTabList.forEach(function (triggerEl) {
    //   var tabTrigger = new bootstrap.Tab(triggerEl);
    //   alert("Test");
    //   triggerEl.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     tabTrigger.show();
    //   });
    // });

    initMap();

    calcRoute(
      drives[selectedIndex].startLocation,
      drives[selectedIndex].endLocation
    );
  }

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

  function calcRoute(start, end) {
    var start = start;
    var end = end;
    var request = {
      origin: start,
      destination: end,
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });
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

var go = false;

window.addEventListener("load", function () {
  var drives;
  var drivers;
  const button = document.getElementById("LookforRider");
  var directionsService;
  var directionsRenderer;

  const observer = new MutationObserver(function () {
    if (go) {
      var triggerTabList = [].slice.call(document.querySelectorAll("#myTab a"));

      triggerTabList.forEach(function (triggerEl, index) {
        var tabTrigger = new bootstrap.Tab(triggerEl);
        var indexTemp = index;
        triggerEl.addEventListener("click", function (event) {
          event.preventDefault();
          tabTrigger.show();
          changeCard(indexTemp);
        });
      });
      go = false;
    }
  });

  let options = {
    childList: true,
    attributes: true,
    characterData: false,
    subtree: true,
  };

  var targetNode = document.body;

  observer.observe(targetNode, options);

  async function LookForRiders() {
    var selectedIndex = 0;

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
        list += `<a class="list-group-item list-group-item-action " role="tab" aria-controls="${drivers[index].firstName}" aria-current="true" data-bs-toggle="list" id="myTab-${drivers[index].firstName}">${drivers[index].firstName}</a>`;
      }
    });
    document.querySelector("#myTab").innerHTML = list;

    document.querySelector("#mapRapper").innerHTML = `<div id="map"></div>`;

    initMap();
    changeCard(selectedIndex);
    go = true;
  }

  function changeCard(selectedIndex) {
    document.querySelector(
      "#card"
    ).innerHTML = ` <h5 class="card-title">Customer: ${
      drivers[selectedIndex].firstName + " " + drivers[selectedIndex].lastName
    }</h5>
    <p class="card-text">From: ${drives[selectedIndex].startLocation} to: ${
      drives[selectedIndex].endLocation
    }</p>
    <a href="#" class="btn btn-primary" onClick="driveFor(${selectedIndex})">Drive for ${
      drivers[selectedIndex].firstName
    }</a>`;

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

  function driveFor(index) {}
});

document.addEventListener("DOMContentReloaded", () => {
  alert("DOM");
  if (go) {
    var triggerTabList = [].slice.call(document.querySelectorAll("#myTab a"));

    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new bootstrap.Tab(triggerEl);
      alert("Test");
      triggerEl.addEventListener("click", function (event) {
        event.preventDefault();
        tabTrigger.show();
      });
    });
  }
});

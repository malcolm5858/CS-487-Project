function profileInfoOnLoad(){
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

    document.querySelector(`#nameoutput`).innerHTML = `<h2 id = "nameoutput" class = "center">${drivers[selectedIndex].firstName} ${drivers[selectedIndex].lastName}</h2>`;


}

profileInfoOnLoad();
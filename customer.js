function initMap() {
	//location of orlando
	var el = document.getElementById('map');
	var chicago = { lat: 41.888915316222274, lng:-87.63659613012062};
	//zoomed in onto the city 
	var mapSettings = {
		center: chicago,
	 	zoom: 11,
	};
	var myMap = new google.maps.Map(el, mapSettings);

	/*Create first marker on the Orlando Downtown
	 *Add event listener with an info window
	 */
	var marker = new google.maps.Marker({
	  position: chicago,
	  map: myMap,
	  animation:google.maps.Animation.DROP
	});

	
}

google.maps.event.addDomListener(window, 'load', initMap);

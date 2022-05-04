var map;
var markerArray = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 4,
        //australia coords
        mapTypeControl:false,
        center: {lat: -25.3, lng: 133.8}
        

    });

    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(
       document.getElementById('autocomplete')), {
          // types:['address'],
           componentRestrictions: {'country': 'au'}
       }
   );
   //places services thing
   places = new google.maps.places.PlacesService(map);
   //when user enters new input
   autocomplete.addListener('place_changed', onPlaceChanged);

 
  
}
function onPlaceChanged(){
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(17);
      search_beaches();
    } else {
      document.getElementById('autocomplete').placeholder = 'Enter a suburb';
    }


}
function search_beaches(){
    var search = {
      bounds: map.getBounds(), 
      query:'beach'
    };
    //performs textsearch since textsearches are based on queries
    places.textSearch(search, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearResults();
        clearMarkers();
        testData(results);


      }
    });
    
}

//pretty much the same as testData but different search
/*
function initPromiseSearch(places){
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');
    var new_places = [];
    for (var i = 0, place; place = places[i]; i++) {
        if (place.types.includes("natural_feature") ){
            new_places.push(place);
            var li = document.createElement('li');
            li.textContent = place.name;
            placesList.appendChild(li);
            bounds.extend(place.geometry.location);
        }
    }
    map.fitBounds(bounds);
    var locations = [];     // array of lat/lngs
    var promiseArray = [];
    var lat;
    var lng;
    for (i = 0; i < new_places.length; i++) {

        lat = new_places[i].geometry.location.lat();
        lng = new_places[i].geometry.location.lng();
        lat.toString();
        lng.toString();
  
        lat = lat+','+lng;
        //console.log(lat);
  
        locations.push(lat);
    }
    for (i = 0; i < locations.length; i++) {
        let url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/535cc4fd71b9bbdcf00b0534e0a74967/'+locations[i]+'?units=si';
        let fetchRequest = fetch(url).then(response => {
            return response.json();
        });
        promiseArray.push(fetchRequest);
    }
  
    Promise.all(promiseArray).then(response => {
        console.log(response); // This will return an array of all your responses
        // Use this response array as input to your function
        getSafety(response, new_places);
    });



}*/
//clear the results
function clearResults() {
    var placesList = document.getElementById('places');
    while (placesList.childNodes[0]) {
      placesList.removeChild(placesList.childNodes[0]);
    }
  }
  //delete marker from global arrray
function clearMarkers() {
    for (var i = 0; i < markerArray.length; i++) {
        if (markerArray[i]) {
        markerArray[i].setMap(null);
        }
    }
    markerArray = [];
}
//activates after clicking button 
function nearbyBeaches(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition);
    }

}
function getPosition(position){
    var pos = { 
        lat:position.coords.latitude,
        lng:position.coords.longitude
    };
    map.setCenter(pos);
    
    /*
    
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 17
  });
  */

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  

  // Perform a  text search.
  service.textSearch(
      {location: pos, radius: 2000, query:'beach'},
      function(results, status) {
        if (status !== 'OK') return;
        clearResults();
        clearMarkers();
        
        //console.log(typeof results[0].geometry.location.lng());
        //console.log("Hello");
        testData(results);
        //getMarineData(results); // change to either getData() -> not working, or testData() -> testing promise.all()
      });
    
}

function testData(places) {
    

  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');
  var new_places = [];
  for (var i = 0, place; place = places[i]; i++) {
      if (place.types.includes("natural_feature") ){
          new_places.push(place);
          var li = document.createElement('li');
          li.textContent = place.name;
          placesList.appendChild(li);
          bounds.extend(place.geometry.location);
      }
  }
  map.fitBounds(bounds);

  var locations = [];     // array of lat/lngs
  var promiseArray = [];
  var lat;
  var lng;


  // Collecting latitudes and longitudes
  for (i = 0; i < new_places.length; i++) {

      lat = new_places[i].geometry.location.lat();
      lng = new_places[i].geometry.location.lng();
      lat.toString();
      lng.toString();

      lat = lat+','+lng;
      //console.log(lat);

      locations.push(lat);
  }

  for (i = 0; i < locations.length; i++) {
      let url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/535cc4fd71b9bbdcf00b0534e0a74967/'+locations[i]+'?units=si';
      let fetchRequest = fetch(url).then(response => {
          return response.json();
      });
      promiseArray.push(fetchRequest);
  }

  Promise.all(promiseArray).then(response => {
      console.log(response); // This will return an array of all your responses
      // Use this response array as input to your function
      getSafety(response, new_places);
  });


}


function getSafety(response, places) { // function to call weather api and get averages

  var avUVIndex;
  var avTemp;
  var avPrecip;
  var avWindSpeed;
  var avWindGust;
  var avOzone;
  var sumUVIndex = 0;
  var sumTemp = 0;
  var sumPrecip = 0;
  var sumWindSpeed = 0;
  var sumWindGust = 0;
  var sumOzone = 0;

  // loop through and sum all the data
  for (i = 0; i < response.length; i++) {
      sumUVIndex = sumUVIndex + response[i].currently.uvIndex;
      sumTemp = sumTemp + response[i].currently.temperature; ; 
      sumPrecip = sumPrecip + response[i].currently.precipIntensity;
      sumWindSpeed = sumWindSpeed + response[i].currently.windSpeed;
      sumWindSpeed = sumWindGust + response[i].currently.windGust;
      sumOzone = sumOzone + response[i].currently.ozone;
  }

  // find averages for all data points
  avUVIndex = sumUVIndex/response.length;
  avTemp = sumTemp/response.length;
  avPrecip = sumPrecip/response.length;
  avWindSpeed = sumWindSpeed/response.length;
  avWindGust = sumWindGust/response.length;
  avOzone = sumOzone/response.length;

  let dataArray = [];           // dataArray = array of reuslts 
  dataArray.push(avUVIndex);    // dataArray[0] = UV Index
  dataArray.push(avTemp);       // dataArray[1] = Temp
  dataArray.push(avPrecip);     // dataArray[2] = Precipitation Rate
  dataArray.push(avWindSpeed);  // dataArray[3] = Wind Speed
  dataArray.push(avWindGust);   // dataArray[4] = Wind Gust
  dataArray.push(avOzone);      // dataArray[5] = Ozone

  // use averages to decide whether beach = safe or nah and put marker
  addMarkers(response,dataArray, places);
}

function addMarkers(response, dataArray, places) { // function to decide whether beach is safe and add marker+info window
  console.log('t1');
  var danger = 0;
  var green_icon = 'http://maps.google.com/mapfiles/ms/icons/green.png';
  var yellow_icon = 'http://maps.google.com/mapfiles/ms/icons/yellow.png';
  var red_icon = 'http://maps.google.com/mapfiles/ms/icons/red.png';

  let  markers_array = [];
  for (i = 0; i < response.length; i++) { //loop - for each place, decide safetfy level and place a marker
      console.log('t2');
      danger = 0;
      // UV Index
      if(response[i].currently.uvIndex < dataArray[0]-(dataArray[0]*0.10)) danger--;
      if(response[i].currently.uvIndex > dataArray[0]+(dataArray[0]*0.10)) danger++;
      // Temp
      if(response[i].currently.temperature < dataArray[1]-(dataArray[1]*0.10)) danger--;
      if(response[i].currently.temperature > dataArray[1]+(dataArray[1]*0.10)) danger++;
      // Precip
      if(response[i].currently.precipIntensity < dataArray[2]-(dataArray[2]*0.10)) danger--;
      if(response[i].currently.precipIntensity > dataArray[2]+(dataArray[2]*0.10)) danger++;
      // Wind speed
      if(response[i].currently.windSpeed < dataArray[3]-(dataArray[3]*0.10)) danger--;
      if(response[i].currently.windSpeed > dataArray[3]+(dataArray[3]*0.10)) danger++;
      // Wind gust
      if(response[i].currently.windGust < dataArray[4]-(dataArray[4]*0.10)) danger--;
      if(response[i].currently.windGust > dataArray[4]+(dataArray[4]*0.10)) danger++;
      // Ozone
      if(response[i].currently.ozone < dataArray[5]-(dataArray[5]*0.10)) danger--;
      if(response[i].currently.ozone > dataArray[5]+(dataArray[5]*0.10)) danger++;

      console.log(danger);
      // now deciding on colour of marker
      var image;
      if (danger < -1) image = green_icon;
      else if (danger > 1) image = red_icon;
      else image = yellow_icon;

      var marker = new google.maps.Marker({ // creating marker
          map:map,
          icon:image,
          title:places[i].name,
          label:i.toString(),
          position:places[i].geometry.location
      });
     
	  var contentString = '<h3>'+marker.title+'</h3>'+'<p>Hello</p>'+'<p><a href="beachProfile?name='+marker.title+'">'+'See beach profile</a></p>';
	  
      var infowindow = new google.maps.InfoWindow({ // create infowindow
          content: contentString
      });
      marker.infowindow = infowindow;
      markerArray.push(marker);
      marker.addListener('click', function() {
		return this.infowindow.open(map, this);
    });
  

  }
 // addInfoWindow(markers_array);

}
/*
function addInfoWindow(markers){
    for (i = 0; i < markers.length; i++){
        var contentString = '<h3>'+markers[i].title+'</h3>'+'<p>Hello</p>'+'<p><a href="beachProfile">'+'See beach profile</a></p>'
        var infowindow = new google.maps.InfoWindow({ // create infowindow
            content: contentString
        });
        markers[i].addListener('click', function() { // make info window open when clicked
            infowindow.open(map, markers[i]);
        });
    }

}*/

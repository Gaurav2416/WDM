/*Intialize the basic value of search */
function initialize() {
   defaultValue()
   initMap()
}
/*common function to get elements from html */
function id(s) { return document.getElementById(s); }
/*generic function to create new elements for html page */
function create(s) { return document.createElement(s); }
/*function will make an request to the proxy server this function is called when find is clicked */
function findRestaurants() {
   /*form is obataained from html page and all fields can be accessed too */
   // set the attributes to search
   var serachCondition = id("searchForm")
   var term = serachCondition.elements.term.value
   var cordinates = map.getBounds()
   console.log(Object.keys(cordinates));
   latitude = parseFloat(cordinates.cb.hi)
   longitude = parseFloat(cordinates.Ha.lo)
   zoomMap = map.getZoom()
   // https://developers.google.com/maps/documentation/javascript/markers
   // https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds
   /*clear the markers on the map */
   for (let i = 0; i < allMarkers.length; i++) {
      allMarkers[i].setMap(null)
   }
   allMarkers.length = 0
   /*to clear the search value and set up the map */
   initialize()
   /*generating object that interacts with server */
   var xhr = new XMLHttpRequest();
   /*Async request is made to the server */
   xhr.open("GET", "proxy.php?term=" + term + "&latitude=" + latitude + "&longitude=" + longitude + "&limit=10", true);
   xhr.setRequestHeader("Accept", "application/json");
   xhr.onreadystatechange = function () {
      /*checks for the state change and status of the response */
      if (this.readyState == 4 && this.status == 200) {
         var json = JSON.parse(this.responseText);
         /*if the response is an error it displays the error message with reason */
         if (json.error) {
            id("result").innerHTML = 'Error occured:' + json.error.code + " reason:" + json.error.description
         } else {
            /*if successfull then move to generating the result and show the response */
            id("result").innerHTML = "Showing Result for:" + term + ' resturant '
            /*sort the result in descending order showing the best result first */
            json.businesses = json.businesses.slice().sort((a, b) => b.rating - a.rating)
            /*generating markers on the map displayed */
            createMarker(json.businesses);
         }
      };
   }
   /*sends the request to the server */
   xhr.send();
}
/*Declaration and initialization of variables */
var map;
var allMarkersObj = []
var allMarkers = []
var latitude = 32.75
var longitude = -97.13
var zoomMap = 16
/*clears the value */
function defaultValue() {
   var serachCondition = id("searchForm")
   serachCondition.elements['term'].value = ""
}
/*creating and initalinzing map object */
// https://developers.google.com/maps/documentation/javascript/overview#Dynamic
function initMap() {
   map = new google.maps.Map(id("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: zoomMap,
   });
}
/*reference(given in project description): https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds */
function createMarker(data) {
   //A LatLngBounds instance represents a rectangle in geographical coordinates, including one that crosses the 180 degrees longitudinal meridian.
   boundary = new google.maps.LatLngBounds();
   for (let i = 0; i < data.length; i++) {
      var lat = data[i].coordinates.latitude
      var long = data[i].coordinates.longitude
      const pointer = new google.maps.Marker({
         position: { lat: lat, lng: long },
         label: String(i + 1),
         title: i + 1 + ". " + data[i].name + ", Rating: " + data[i].rating,
         map: map,

      })

      pointer.addListener("click", () => {
         /*check for condition for clicking when window is open or not */
         if (allMarkersObj.length > 0 && allMarkersObj[0].anchor != null) {
            if (allMarkersObj[0].anchor.label == pointer.label) { closeWindow(); } else {
               closeWindow();
               const a = searchContent(data[i])
               a.open(map, pointer);
               allMarkersObj.push(a)
            }
         } else {
            closeWindow();
            const a = searchContent(data[i])
            a.open(map, pointer);
            allMarkersObj.push(a)
         }
      });
      allMarkers.push(pointer)
      boundary.extend({ lat: lat, lng: long })
   }
   map.fitBounds(boundary)
}
/*Close window when new window is opened */
function closeWindow() {
   if (allMarkersObj.length > 0) {
      allMarkersObj[0].set("pointer", null)
      allMarkersObj[0].close()
      allMarkersObj.length = 0
   }

}
/*creates object of infowindow and add the html that is to be displayed and return the infowindow object */
function searchContent(data) {
   if (data.categories.length > 0) {
      var categories = []
      for (let i = 0; i < data.categories.length; i++) {

         categories.push(data.categories[i].title)
      }
   }
   const contents =
      '<div id="content" width = "80px" height = "80px">' +
      "<img src=" + data.image_url + " width = '295px' height = 'fit-content'/>" + "<br>" +
      " <label>Name:" + "<a href=" + data.url + " style = 'color: black;'>" + data.name + "</a></label>" + "<br>" +
      " <label>Ratings:" + data.rating + "</label>" + "<br>" +
      " <label>Categoties:" + categories + "</label>" + "<br>" +
      " <label>Phone:" + data.phone + "</label>" + "<br>" +
      " <label>Transaction:" + data.transactions + "</label>" + "<br>" +
      "</div>";
   const infowindow = new google.maps.InfoWindow({
      content: contents,
   });
   return infowindow
}

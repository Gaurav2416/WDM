function initialize () {
}

function findRestaurants () {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?term=indian+restaurant&location=Arlington+Texas&limit=5");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
       }
   };
   xhr.send(null);
}

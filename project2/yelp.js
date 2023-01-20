/*Intialize the basic value of search */
function initialize() {
   var serachCondition = id("searchForm")
   serachCondition.elements['city'].value = ""
   serachCondition.elements['term'].value = ""
   serachCondition.elements.level.value = 10
}
/*common function to get elements from html */
function id(s) { return document.getElementById(s); }
/*generic function to create new elements for html page */
function create(s){return document.createElement(s);}
/*function will make an request to the proxy server this function is called when find is clicked */
function findRestaurants() {
   /*check if there is a childnode is there the destroys the node */
   if(document.getElementById("output").hasChildNodes())
   id('output').removeChild(id('res'))
   /*form is obataained from html page and all fields can be accessed too */
   var serachCondition = id("searchForm")
   var loc = serachCondition.elements['city'].value
   var term = serachCondition.elements.term.value
   var limit = serachCondition.elements['level'].value
   /*call to clear the fieds so that user can search for new items */
   initialize()
   /*generating object that interacts with server */
   var xhr = new XMLHttpRequest();
   /*Async request is made to the server */
   xhr.open("GET", "proxy.php?term=" + term + "&location=" + loc + "&limit=" + limit, true);
   xhr.setRequestHeader("Accept", "application/json");
   xhr.onreadystatechange = function () {
      /*checks for the state change and status of the response */
      if (this.readyState == 4 && this.status == 200 ) {
         var json = JSON.parse(this.responseText);
         /*if the response is an error it displays the error message with reason */
         if(json.error){
            id("result").innerHTML = 'Error occured:' + json.error.code + " reason:" + json.error.description
         }else{
            /*if successfull then move to generating the result and show the response */
         id("result").innerHTML = "Showing Result for:" + term +' resturant '+ loc
         /*sort the result in descending order showing the best result first */
         json.businesses = json.businesses.slice().sort((a, b) => b.rating - a.rating)
         /*generating tabular result */
         document.getElementById("output").appendChild(displayResult(json.businesses))
         /*added styles to the div area */
         document.getElementById("output").style.margin = "auto"
         document.getElementById("output").style.width = "fit-content"
         document.getElementById("output").style.border = "3px solid black"
         document.getElementById("output").style.padding = "10px"
      }
   };}
   /*sends the request to the server */
   xhr.send();
}
/*this function will format the response object to the result display that is easy to understand */
function displayResult(data){
   var table = create('table'), tr, tdimg,tdName,tdCat,tdPrice,tdRating,tdAdd,tdPhone;
   table.appendChild(headerCreate())
   for(let i = 0; i< data.length; i ++){
      tr = create('tr')
      tdimg =  createImage(data[i])
      tdName = createName(data[i])
      tdCat = categories(data[i])
      tdPrice = priceDisplay(data[i])
      tdRating = ratingDisplay(data[i]) 
      tdAdd = addressDisplay(data[i])
      tdPhone = phoneDisplay(data[i])
      td = create('td')
      td.innerHTML = i + 1
      td.style.textAlign = 'center'
      tr.appendChild(td)
      tr.appendChild(tdimg)
      tr.appendChild(tdName)
      tr.appendChild(tdCat)
      tr.appendChild(tdPrice)
      tr.appendChild(tdRating)
      tr.appendChild(tdAdd)
      tr.appendChild(tdPhone)
      table.appendChild(tr)
   }
   table.style.border = '1px solid !important '
   table.setAttribute('id','res')
return table
}
/*handling the header of the result content */
function headerCreate(){

   var trHead = create('tr')
   var thImage = create('th')
   var th = create('th')
   trHead.appendChild(th)
   thImage.innerHTML = 'Image'
   trHead.appendChild(thImage)
   var thName = create('th')
   thName.innerHTML = 'Name'
   trHead.appendChild(thName)
   var thCat = create('th')
   thCat.innerHTML = 'Categories'
   trHead.appendChild(thCat)
   thPrice = create('th')
   thPrice.innerHTML = 'Price'
   trHead.appendChild(thPrice)
   thRating = create('th')
   thRating.innerHTML = 'Rating'
   trHead.appendChild(thRating)
   thAdd = create('th')
   thAdd.innerHTML = 'Address'
   trHead.appendChild(thAdd)
   thPhone = create('th')
   thPhone.innerHTML = 'Phone No'
   trHead.appendChild(thPhone)
   return trHead
}
/*format the phone number display */
function phoneDisplay(data){
   var td = create('td')
   td.innerHTML = data.phone
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
/*format the address display */
function addressDisplay(data){
   var td = create('td')
   td.innerHTML = data.location.display_address.toString()
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
/*format the rating display */
function ratingDisplay(data){
   var td = create('td')
   td.innerHTML = data.rating
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
/*format the price display */
function priceDisplay(data){
   var td = create('td')
   if(data.price != undefined)
      {td.innerHTML = data.price}
      else{
         td.innerHTML = ""
      }
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
/*format the categories display */
function categories(data){
var td = create('td')
var cat = []
for(let i = 0; i < data.categories.length;i++){
   cat.push(data.categories[i].title)
}
td.innerHTML = cat.toString()
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
/*format the names of resturants display */
function createName(data){
var td = create('td')
var link = create('a')
var name = document.createTextNode(data.name)
link.appendChild(name)
link.setAttribute('href', data.url)
link.setAttribute('target', "_blank")
link.style.color = 'inherit' 
link.style.fontFamily = 'inherit'
link.style.fontSize = 'inherit'

td.appendChild(link)
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
/*format image url to image to display */
function createImage(data){
   var td = create('td')
   var image = create('img')
   image.setAttribute('src',data.image_url)
   /*styling of the image */
   image.style.borderRadius = '4px';
   image.style.verticalAlign = 'middle'
   image.style.boxSizing = 'border-box'
   image.style.height = '100px'
   image.style.width = '100px'
   td.appendChild(image)
      td.style.border = "1px solid" 
      td.style.textAlign = 'center'
   return td
}
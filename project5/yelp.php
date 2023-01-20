<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Find Restaurants on Yelp</title>
    <meta charset="utf-8"/>
  </head>
    <body>
    <!-- Form submit on find and reset -->
    <form method="GET" id="searchForm">
       <label>City: <input type="text" id="city" name = "city"/></label>
       <label>Search: <input type="text" id="term" name = "term" /></label>
       <label>Level:
         <select name ="level" id="level">
           <option value="5" >5</option>
           <option value="10" selected>10</option>
           <option value="15">15</option>
           <option value="20">20</option>
         </select>
         <input type="submit" name ='Find' value="Find" />
         <input type="submit" name ='reset' value="Reset"/>
    </form>
    <hr>
    <!-- dipaly the resul and favorite -->
    <div  id = "output" name="outputA" style="margin: auto; width: fit-content; border: 3px solid black; padding: 10px;">
        <?php 
        // still to handle duplicate and free enteries
        // Session has started
       session_start();
    //    Setting session variable
       if(!isset($_SESSION['favorites'])){
        $_SESSION['favorites'] = array();
    }        
    
        // Check for Get method
    if(isset($_GET['Find'])) {
        $_SESSION["city"] =  $_GET['city'];
        $url = "?location=".$_SESSION["city"] . '&term=' . $_GET['term'] . '&limit=' .$_GET['level'];
        // Check for the response from api
        $_SESSION["search"] = callURL($url)['businesses'];
        // Create dipaly
        getFavData();
        // if (in_array('kOizi7VaLVDeiofEqRsi_Q',$_SESSION['favorites'][0])){echo 'hello';}
        createTable($_SESSION["search"]);
        // print_r($_SESSION['favorites']);
        // createFavTable($_SESSION['favorites']);

    }
    // check for the favorite list using store of get method
    if(isset($_GET['store'])) {
        $checkExitsFav = FALSE;
        for($i = 0; $i< count($_SESSION["search"]); $i++){
            if($_SESSION["search"][$i]['id'] == $_GET['store'])
            {   
                for ($j = 0; $j<count($_SESSION['favorites']);$j++){
                    if (in_array($_GET['store'],$_SESSION['favorites'][$j])){
                        $checkExitsFav = TRUE;
                    }
                }
                if (!$checkExitsFav)
                    // array_push( $favKey,$_GET['store']);
                    {insertDB($_SESSION["search"][$i]);
                    }else{
                        getFavData();
                    }
                
               createTable($_SESSION["search"]);
            //    createFavTable($_SESSION['favorites']);

            }
        }
    }
// Clear all the favorite and search result
    if(isset($_GET['reset'])) {
        session_unset();
    // destroy the session
        session_destroy();
    }
    // call for the api to yelp
    function callURL($urlStr){
        $API_KEY = '2HVqVWs8Ia4UuNrLmK2vIN5x3_SVmbkye1sNwUhdVJrmZH1zFsJTj0uWxiNfWG6RdS-NhjoLseXGgy9CnfIFbKCk4oXMmwAC-03av_reQsD9LyEVwjqrdMkU9p00Y3Yx';
        $API_HOST = "https://api.yelp.com";
        $SEARCH_PATH = "/v3/businesses/search";
        $BUSINESS_PATH = "/v3/businesses/"; 
        $curl = curl_init();
        if (FALSE === $curl)
        throw new Exception('Failed to initialize');
     $url = $API_HOST . $SEARCH_PATH . $urlStr ;
     curl_setopt_array($curl, array(
               CURLOPT_URL => $url,
               CURLOPT_RETURNTRANSFER => true,  // Capture response.
               CURLOPT_ENCODING => "",  // Accept gzip/deflate/whatever.
               CURLOPT_MAXREDIRS => 10,
               CURLOPT_TIMEOUT => 30,
               CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
               CURLOPT_CUSTOMREQUEST => "GET",
               CURLOPT_HTTPHEADER => array(
                   "authorization: Bearer " . $API_KEY,
                   "cache-control: no-cache",
               ),
           ));
     $response = curl_exec($curl);
     curl_close($curl);
     return  json_decode($response,true);
    }
    // display for the result of api 
    function createTable($data){
        echo "<table border='1'>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Mobile</th>
                <th>Rating</th>
                <th>Address</th>
                </tr>";
        for($i = 0; $i < count($data); $i++){
            echo "<tr>";
            echo "<form method='GET'>";
            echo "<td>" . "<a href='yelp.php?store=".$data[$i]['id'] ."'>"."<img src='".$data[$i]['image_url'] ."'". "style= 'border-radius: 4px; vertical-align: middle; box-sizing: border-box; height: 100px; width: 100px;'/>"."</a>"."</td>";
            echo "<td>" ."<a style= 'color: black' href=". $data[$i]['url'].">". $data[$i]['name'] ."</a>"."</td>";
            $cat = '';
            foreach($data[$i]['categories'] as $cate)
            {
                $cat = $cat.$cate['title'].',' ;
            }
            echo "<td>" . $cat . "</td>";
            echo "<td>" . $data[$i]['display_phone'] . "</td>";
            echo "<td>" . $data[$i]['rating'] . "</td>";
            $dispapyAdd = '';
            foreach($data[$i]['location']['display_address'] as $address)
            {
                $dispapyAdd = $dispapyAdd . $address ;
            }
            echo "<td>" . $dispapyAdd . "</td>";
            echo "</tr>";
        }
        echo "</table>";        
    }   
    // display of the favorite list 
    function createFavTable($data){
        echo "<table border='1'>
                <caption>Favorites</caption>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Mobile</th>
                <th>Rating</th>
                <th>Address</th>
                </tr>";
        if($data == 'No Favorite chosen!!!'){
            echo "<tr>";
            echo "<td>" . $data . "</td>";
            echo "</tr>";
        }else{
            for($i = 0; $i < count($data); $i++){
            echo "<tr>";
            echo "<td>" . "<img src='".$data[$i]['image_url'] ."'". "style= 'border-radius: 4px; vertical-align: middle; box-sizing: border-box; height: 100px; width: 100px;'/>"."</td>";
            echo "<td>" ."<a style= 'color: black' href=". $data[$i]['yelp_page_url'].">". $data[$i]['name'] ."</a>"."</td>";
            echo "<td>" . $data[$i]['categories'] . "</td>";
            echo "<td>" . $data[$i]['phone'] . "</td>";
            echo "<td>" . $data[$i]['rating'] . "</td>";
            echo "<td>" . $data[$i]['address'] . "</td>";
            echo "</tr>";
        }
    }  
        
        echo "</table>";        
    }
    function dbConnection(){
       
        $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=yelp",
               "root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        return $dbh;
}
function insertDB($req){
    $dbh = dbConnection();
    $id = $req['id'];
    $name = $req['name'];
    $img_Url = $req['image_url'];
    $yelpUrl = $req['url'];
    $cat = '';
    foreach($req['categories'] as $cate)
        {
            $cat = $cat.$cate['title'].',' ;
        }
    $rat = $req['rating'];
    if (array_key_exists('price', $req)){
        $price = $req['price'];
    }else{
        $price = '';
    }
    $phone = $req['display_phone'];
    $dispapyAdd = '';
    foreach($req['location']['display_address'] as $address)
        {
            $dispapyAdd = $dispapyAdd . $address ;
        }
        $dbh->beginTransaction();
        $qstmt = $dbh->prepare("INSERT INTO favorites (id, name,image_url,yelp_page_url,categories,price,rating,address,phone) VALUES (:id,:name,:img_Url,:yelpUrl,:cat,:price,:rat,:dispapyAdd,:phone)");
        $qstmt->bindParam(':id', $id);
        $qstmt->bindParam(':name', $name);
        $qstmt->bindParam(':img_Url', $img_Url);
        $qstmt->bindParam(':yelpUrl', $yelpUrl);
        $qstmt->bindParam(':cat', $cat);
        $qstmt->bindParam(':price', $price);
        $qstmt->bindParam(':rat', $rat);
        $qstmt->bindParam(':dispapyAdd', $dispapyAdd);
        $qstmt->bindParam(':phone', $phone);
        $qstmt->execute();
        $dbh->commit();
        getFavData();
}
function getFavData(){
    $dbh = dbConnection();
    $stmt = $dbh->prepare('select * from favorites');
    $stmt->execute();
    $row = $stmt->fetchAll();
    if(count($row) == 0){
        createFavTable('No Favorite chosen!!!');
    }else{
        $_SESSION['favorites'] = $row;
    createFavTable($_SESSION['favorites']);
    }
    
}
?></div>


</body>
</html>


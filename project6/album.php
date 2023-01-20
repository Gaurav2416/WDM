<html>
<head>
   <title>Photo Album App</title>
</head>
<body>
   <!-- Form to upload an image -->
   <form action="album.php" method="POST" enctype="multipart/form-data">
      Select image to upload:
      <input type="file" name="fileToUpload" id="fileToUpload">
      <input type="submit" value="Upload Image" name="submit">
   </form>
   </br>
</body>
</html>
<pre>
<?php

// put your generated access token here
// Note: Please enter your own token before execution
$auth_token = 'sl.BStNMwKx9lB4BrLvqkerP4YKf-1D1IZi4j5_zeGkPC5Vso0-sapbQk5Ci5hzP08YCBAcFBq5nuq24Aj0xWONgzxI_JkordxCJ3BaCfu16V8ht5lHfYi3VkY0cN6u28QeUJ54l148RZxH';
// import the Dropbox library
include "dropbox.php";
// set it to true to display debugging info
$debug = true;
// display all errors on the browser
error_reporting(E_ALL);
ini_set('display_errors', 'On');
// create a new Dropbox folder called images
createFolder("images");
// check for the Post form submission 
if (isset($_POST["submit"])) {
   if (isset($_FILES['fileToUpload'])) {
      // Move the file to the section where the code is present to read the files
      if (!move_uploaded_file($_FILES['fileToUpload']['tmp_name'], './' . $_FILES['fileToUpload']['name'])) {
         die('Error no file found');
      }
      /*upload the file which is given by the user */
      // upload a local file into the Dropbox folder images
      upload($_FILES['fileToUpload']['name'], "/images");
      // displays the file after uploading
      dipalyContent();
   }
}
function dipalyContent()
{
   // call function of the dropbox.php to get all the file that are uploaded in the in dropbox
   $result = listFolder("/images");
   // checks if the response is empty
   if (!empty($result['entries'])) {

      createTable($result['entries']);
   }
}
// variable to get the image source
$imgSr = '';
// Display the result in tabular form
function createTable($data)
{
   echo "<table border='1'>
           <tr>
           <th>Name</th>
           <th>Delete</th>
           <th>View</th>
           </tr>";
   for ($i = 0; $i < count($data); $i++) {
      echo "<tr>";
      echo "<td>" . $data[$i]['name'] . "</td>";
      echo "<td>" . "<a href='album.php?delete=" . $data[$i]['name'] . "'>" . "Delete</a>" . "</td>";
      echo "<td>" . "<a href='album.php?display=" . $data[$i]['name'] . "'>" . "Display</a>" . "</td>";
      echo "</tr>";
   }
   echo "</table><br>";
}
// download a file from the Dropbox folder images into the local directory tmp
if (isset($_GET['display'])) {
   download("/images" . '/' . $_GET['display'], "tmp" . '/' . $_GET['display']);
   //  to show list of all the files
   dipalyContent();
   // showing in the display area
   echo "<img src='" . $_GET['display'] . "'" . "style= 'border-radius: 4px; vertical-align: middle; box-sizing: border-box; height: 300px; width: 300px'/>";

}
// delete a Dropbox file
if (isset($_GET['delete'])) {
   delete("/images" . '/' . $_GET['delete']);
   // if the tmp directory count is not zero then delete the file from local directory tmp
   if (count(scandir("tmp")) > 2) {
      unlink("tmp" . '/' . $_GET['delete']);
   // if the tmp directory count is not zero then delete the file from local directory project6 copy image
      unlink('./' . $_GET['delete']);

   }
   dipalyContent();
}
?>
</pre>
<!-- Reference:
1. https://www.w3schools.com/php/php_file_upload.asp
2. class slides (page 34) for a PHP example that handles file uploads -->
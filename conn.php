<?php
$con = mysqli_connect("localhost", "root", "", "webproject2") 
    or die("Could not connect to the server: " . mysqli_connect_error());

echo "Connected to the server and the database.";
?>

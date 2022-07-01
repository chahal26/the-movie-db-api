<?php
    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "root";
    $db_name = "the-movie-db";

    // Create connection
    $dbConn = new mysqli($db_server, $db_user, $db_pass, $db_name);

    // Check connection
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    //Defining a APIKEY constant
    define("APIKEY", "e6b46c7224941e6dcf4e66855339283b");
?>
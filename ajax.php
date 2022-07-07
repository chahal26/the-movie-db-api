<?php
    require_once('config.php');

    if(isset($_GET['method']) && $_GET['method'] == 'search'){
        //Search text
        $searchQuery = $_POST['searchQuery'] ?? '';

        //IP Address
        $ip_addr = $_SERVER['REMOTE_ADDR'] ?? '';

        //Inserting Data to DB
        $sqlQuery = "INSERT INTO analytics (search_term, ip_address, created_at) VALUES ('$searchQuery', '$ip_addr', now())";
        
        if ($dbConn->query($sqlQuery) !== TRUE) {
            echo "Error: " . $sqlQuery . "<br>" . $dbConn->error;
        }

        $url = "https://api.themoviedb.org/3/search/movie?api_key=".APIKEY."&language=en-US&query='".$searchQuery."'&page=1&results=10";
        //Calling API
        $movieList = file_get_contents($url);
        $movieList = json_decode($movieList);
        
        $results = $movieList->results;
        //Restricting results to max 10

        if(count($movieList->results) > 10 ){
            $results = array_slice($movieList->results,0,10);
        }
        
        echo json_encode($results);
    }

    if(isset($_GET['method']) && $_GET['method'] == 'details'){
        //Search text
        $mid = $_POST['mid'] ?? '';

        $url = "https://api.themoviedb.org/3/movie/".$mid."?api_key=".APIKEY;
        //Calling Api
        $movieDetail = file_get_contents($url);

        echo $movieDetail;
    }

?>
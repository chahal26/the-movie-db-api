function getMovies(){
    const searchQuery = $('#search-field').val();

    $.ajax({
        type: 'post',
        url: 'ajax.php?method=search',
        async: true,
        dataType: 'json',
        data : { searchQuery: searchQuery},

        success: function(response){
            $('.movieslist').html(''); //resetting the movie list section
            $('.movie-detail').hide(); // Hiding movie detail section

            //Checking if there is any data in search or not
            if(response.length === 0){
                $('.nodatafound').show();
            }else{
                $('.nodatafound').hide();
            }

            // Appending the data to movies list section
            response.map((movie) => {

                const d = new Date(movie.release_date);
                //Using a default image if poster_path is null
                const poster = movie.poster_path === null ? 'https://via.placeholder.com/300x450' : 'https://image.tmdb.org/t/p/w300/'+movie.poster_path;

                var movieCard = '<div class="col-md-3 mt-2"><div class="card movie-card" onclick="singleMovie('+movie.id+')"><img src="'+poster+'" class="card-img-top" alt="'+movie.title+'"><div class="card-body"><h5 class="card-title">'+movie.title+'</h5><p class="card-subtitle mb-3 text-muted">'+d.getFullYear()+'</p></div></div></div>';

                $('.movieslist').append(movieCard);
            });
        }
    });
}

function singleMovie(mid){
    $.ajax({
        type: 'post',
        url: 'ajax.php?method=details',
        async: true,
        dataType: 'json',
        //Sending the movie id as mid with data
        data : { mid : mid },

        //Appending the movie data to movie detail section
        success: function(response){
            const movieImg = response.poster_path == null ? 'https://via.placeholder.com/300x450' :'https://image.tmdb.org/t/p/w300/'+response.poster_path ;
            const movieTitle = response.title ;
            const movieTagline = response.tagline ;
            const movieOverview = response.overview ;
            
            //Converting genres to comma seperated string
            const genresArr = [];
            response.genres.map((genre) => {
                genresArr.push(genre.name)
            });
            const movieGenre = genresArr.join(', ')

            $('.movie-detail').show();
            $('#detail-img').attr('src',movieImg);
            $('#detail-title').text(movieTitle);
            $('#detail-tagline').text(movieTagline);
            $('#detail-overview').text(movieOverview);
            $('#detail-genre').text(movieGenre);

            //taking user to movie detail section whenever a movie is clicked
            location.href="#movie";
        }
    });
}
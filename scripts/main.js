"use strict";

let firebase = 	require('./firebase/firebaseConfig.js'),
	user = 		require("./firebase/user.js"),
	db = 		require("./db-interaction.js"),
	Tmdb = 		require('./filterTMDB.js');


 $(document).ready(function(){
    $("#title-search").prop('disabled', true);

    $('#show-untracked').prop('disabled', true);
    $('#show-unwatched').prop('disabled', true);
    $('#show-watched').prop('disabled', true);
	$('#show-favorites').prop('disabled', true);
	$('#numRatingSlider').prop('disabled', true);
	$('#numRatingNumber').prop('disabled', true);

   	$('#logout-btn').hide();
  	$('#login-btn').show();

  });

// REST API///
function loadMoviesToDom() {
	let currentUser = user.getUser();

	db.getMoviesOnWatchList(currentUser)
	.then(function(movieData)
	{		
		var idArray = Object.keys(movieData);
		idArray.forEach(function(key)
		{
			movieData[key].firebasekey = key;
			Tmdb.watchedMovieList( movieData[key]);
		});
	});
}

// Login/Logout Listeners
$('#login-btn').click(function() {
	user.logInGoogle().then( function(result) { 
  		user.setUser(result.user.uid);
  	});

	event.preventDefault();

   	$("#title-search").val("");
	$("#card-div").empty();
 
  	$('#logout-btn').show();
  	$('#login-btn').hide();

  	$("#title-search").prop('disabled', false);
	$("#title-search").prop('enabled', true);

    $('#show-untracked').prop('disabled', false);
    $('#show-untracked').prop('enabled', true);

    $('#show-unwatched').prop('disabled', false);
    $('#show-unwatched').prop('enabled', true);

    $('#show-watched').prop('disabled', false);
    $('#show-watched').prop('enabled', true);

	$('#show-favorites').prop('disabled', false);
	$('#show-favorites').prop('enabled', true);

	$('#numRatingSlider').prop('disabled', false);
	$('#numRatingSlider').prop('enabled', true);

	$('#numRatingNumber').prop('disabled', false);
	$('#numRatingNumber').prop('enabled', true);

  	loadMoviesToDom();
});


$('#logout-btn').click(function() {

	event.preventDefault();

	$("#title-search").val("");
	$("#card-div").empty();

	user.logOut();
	location.reload();
 });

/* Search from bar and do title search */
$("#title-search").on("keyup", (event) => {
	if (event.which === 13) {
		Tmdb.searchTMDB().then(function (data)
		{
			$("#title-search").val("");
			$("#card-div").empty();

			Tmdb.tmdbPrint(data);
		});
	}
});

$('#show-unwatched').click(function () {
   	
   	$("#title-search").val("");
	$("#card-div").empty();
	loadMoviesToDom();
});

module.exports = loadMoviesToDom;

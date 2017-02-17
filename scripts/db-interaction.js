"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db


// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getMoviesOnWatchList (user) {
	return new Promise (function(resolve, reject) {
		$.ajax({
			url: `https://moviehistory-e4b18.firebaseio.com/movies.json?orderBy="uid"&equalTo="${user}"`,
			type: 'GET'
		}).done(function(movieData){
			resolve(movieData);
		}).fail( function(error){
			reject(error);
		});
	});
}

function addMovieToWatchList (movie) {
	// console.log("Adding Movie to Firebase: ", movie);
	return new Promise ( function(resolve, reject){
		$.ajax({
			url: 'https://moviehistory-e4b18.firebaseio.com/movies.json',
			type: 'POST',
			data: JSON.stringify(movie),
			dataType: 'json'
		}).done(function(movieId){
			resolve(movieId);
		});
	});
}

function deleteMovieFromWatchList (movieId) {
	return new Promise( function(resolve, reject){
		$.ajax({
			url: `https://moviehistory-e4b18.firebaseio.com/movies/${movieId}.json`,
			method: 'DELETE'
		}).done( function(){
			resolve();
		});
	});
}

function editMovieOnWatchList (movieObj, movieId) {
	return new Promise ( function(resolve, reject){
		$.ajax({
			url: `https://moviehistory-e4b18.firebaseio.com/movies/${movieId}.json`,
			type: 'PUT',
			data: JSON.stringify(movieObj)
		}).done (function (data){
				resolve(data);
		});
	});
}


module.exports = {
	getMoviesOnWatchList,
	addMovieToWatchList,
	deleteMovieFromWatchList,
	editMovieOnWatchList
};

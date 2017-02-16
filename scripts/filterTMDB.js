"use strict";

let	Tmdb = {},
	apikey = require('./apikey.js'),
	cardTemplate = require("../templates/card-template.hbs"),
	watchlistTemplate = require("../templates/watchlist.hbs"),
	user = require('./firebase/user.js'),
	db = require("./db-interaction.js"),
	main = require("./main.js");

Tmdb.searchTMDB = function(){
	let titleSearch = $("#title-search").val();
	return new Promise( (resolve, reject) => {
		$.ajax({
			method: 'GET',
			url: `https://api.themoviedb.org/3/search/movie?query=${titleSearch}&api_key=${apikey.apiKey}`
		}).done( (data) => {
			resolve(data);
		});
	});
};

Tmdb.watchedMovieList = function (data) {
	let newDiv = document.createElement("div");
	newDiv.innerHTML = watchlistTemplate(data);
	$("#card-div").append(newDiv);

	$(".remove-movie").click(function () {
		let firebaseID = $(event.target).closest('div').attr('id').slice(5);
		db.deleteMovieFromWatchList(firebaseID);
		$('#div--' + firebaseID).remove();
	});

	$(".ratings").click(function () {
		console.log('from ratings');
	});

};

Tmdb.tmdbPrint = function (data) {
	let newDiv = document.createElement("div");
	newDiv.innerHTML = cardTemplate(data);
	$("#card-div").append(newDiv);

	$(".add-movie").click(function () {
		let divID = $(event.target).closest('div').attr('id').slice(5);

		let titleString = "title--" + divID;
		let yearString = "year--" + divID;
		let plotString = "plot--" + divID;
		let imgString = "img--" + divID;

	 	let titleGrab = $("#" + titleString).text();
	 	let yearGrab = $("#" + yearString).text();
	 	let plotGrab = $("#" + plotString).text();
	 	let imgGrab = $("#" + imgString).attr('src').slice(32);

	    let movieObj = {
	      id: divID,
	      title: titleGrab,
	      release_date: yearGrab,
	      overview: plotGrab,
	      imgpath: imgGrab,
	      uid: user.getUser()
	  	};

	db.addMovieToWatchList(movieObj);
	});
};


module.exports = Tmdb;

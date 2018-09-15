// API Routes
// ==============
// require friends.js
var friendsList = require('../data/friends.js');

var bodyParser = require('body-parser');
var path = require('path');


// Create Routes
module.exports = function(app) {

	app.get('/api/friends', function(req, res){
		res.json(friendsList);
	});

	app.post('/api/friends', function(req, res){

		var bestMatch = {
			'name': 'none',
			'photo': 'none'
		};

		//comparative number for user's array total
		var userTotal = sum(req.body.scores);
		//confirms sum of user's array
		//console.log(userTotal);

		//set outside of loops to be mutable and resetable
		var friendTotal = 0;
		// //functions to return exact match
		// for (var i = 0; i < friendsList.length; i++) {
		// 	friendTotal = sum(friendsList[i].scores);
		// 	//console.log(friendTotal);
		// 	if (friendTotal == userTotal) {
		// 		bestMatch.name = friendsList[i].name;
		// 		bestMatch.photo = friendsList[i].photo;
		// 	}
		// };

		//runs if exact match is not found
		// if (bestMatch.name == 'none') {
			//highest possible amount score array can equal
			var closest = 50;
			//function to loop though array of friends and attempt to find friend sum closest to user sum
			//should only update bestMatch when a closer sum is found
			for (var i = 0; i < friendsList.length; i++) {
				friendTotal = sum(friendsList[i].scores);
				var difference = Math.abs(friendTotal - userTotal);
				if ( difference <= closest ){
					closest = difference;
					bestMatch.name = friendsList[i].name;
					bestMatch.photo = friendsList[i].photo;
				};
			};
		// };

		//function to add the sum from the scores provided by the array obect
		function sum (array) {
			var total = 0;
			for (var n = 0; n < array.length; n++) {
				total += parseInt(array[n]);
			}
			return total;
		}

		//test answer
		console.log(bestMatch);
		//return bestMatch back to webpage
		res.json(bestMatch);

	});

};
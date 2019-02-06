const path = require('path');

// import friend entries
let friends = require('../data/friends.js');

// export API routes
module.exports = function(app) {

	// get friends list
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		let newProfile = req.body;
		console.log('newProfile = ' + JSON.stringify(newProfile));

		let userResponses = newProfile.scores;
		console.log('userResponses = ' + userResponses);

		// best match up
		let name = '';
		let photo = '';
		let totalDifference = 10000;

		// Examine all existing friends in the list
		for (let i = 0; i < friends.length; i++) {

			// calculate differences
			let diff = 0;
			for (let j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			//record the friend match
			if (diff < totalDifference) {
				//console.log('Friend name = ' + friends[i].name);

				totalDifference = diff;
			    name = friends[i].name;
				photo = friends[i].photo;
			}
		}

		// Add new user
		friends.push(newProfile);

		// Send appropriate response
		res.json({status: 'OK', name: name, photo: photo});
	});
};
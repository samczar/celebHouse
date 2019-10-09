const mongoose = require('mongoose')

const CelebSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}
	// dob: String,
	// country: String,
	// gender: String,
	// alive: {
	// 	type: Boolean,
	// 	default: true
	// },
	// images: [],
	// occupation: []
})

module.exports = mongoose.model('Celebs', CelebSchema)

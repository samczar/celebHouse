const express = require('express')
const router = express.Router()

const numberOfPerson = 3
const data = [
	{
		name: 'Anyanka Chibuzo',
		gender: 'male',
		image: 'http://localhost:3000/images/chibuzo.jpg'
	},
	{
		name: 'Anyanka Ebere',
		gender: 'male',
		image: 'http://localhost:3000/images/ebere.jpg'
	},
	{
		name: 'Kris',
		gender: 'male',
		image: 'http://localhost:3000/images/kris.jpeg'
	},
	{
		name: 'Brown',
		gender: 'male',
		image: 'http://localhost:3000/images/brown.jpg'
	},
	{
		name: 'Tracy',
		gender: 'female',
		image: 'http://localhost:3000/images/tracy.png'
	},
	{
		name: 'Blessing',
		gender: 'female',
		image: 'http://localhost:3000/images/blessing.jpg'
	},
	{
		name: 'Gladys',
		gender: 'female',
		image: 'http://localhost:3000/images/gladys.jpg'
	},
	{
		name: 'Hannah',
		gender: 'female',
		image: 'http://localhost:3000/images/hannah.jpg'
	}
]

const malePerson = (values = []) => {
	return values.filter(e => e.gender === 'male')
}
const femalePerson = (values = []) => {
	return values.filter(e => e.gender === 'female')
}
const getThreePersons = (values = [], n = 0) => {
	return values
		.map(x => ({ x, r: Math.random() }))
		.sort((a, b) => a.r - b.r)
		.map(a => a.x)
		.slice(0, n)
}

const CelebModel = require('../models/celeb')

router.get('/allmale', (req, res) => {
	res.send(malePerson(data))
})
router.get('/allfemale', (req, res) => {
	res.send(femalePerson(data))
})
router.get('/celebhouse/male', (req, res) => {
	res.status(200).send(getThreePersons(malePerson(data), numberOfPerson))
})
router.get('/celebhouse/female', (req, res) => {
	res.status(200).send(getThreePersons(femalePerson(data), numberOfPerson))
})
router.post('/', (req, res) => {
	const celebModel = new CelebModel({
		name: req.body.name
		// country: req.body.country,
		// dob: req.body.dob,
		// gender: req.body.gender,
		// occupation: req.body.occupation,
		// alive: req.body.alive,
		// image: req.body.image
	})
	// celebModel
	// 	.save()
	// 	.then(data => {
	// 		res.json(data)
	// 	})
	// 	.catch(err => {
	// 		res.json({ message: err })
	// 	})
})

module.exports = router

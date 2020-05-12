const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Request = require('../models/request')
const requireAuth = ('../lib/requireAuth')



// Send FriendRequest --> POST
router.get('/addfriend/:id', async (req, res, next) => {
	try {

		console.log("req.session")
		console.log(req.session)

		const findUser = await User.findById(req.session.userId)

		const findUserToAdd = await User.findById(req.params.id)

		console.log("findUser")
		console.log(findUser)

		res.json({
			data: findUser,
			data2: findUserToAdd,
			message: `Here is the foundUsers`
		})
	}
	catch (err) {
		next (err)
	}
})


// GET for individual Requests
router.get('/', async (req, res) => {

	const findAllRequests = await Request.find()
		.populate('sender')
		.populate('recipient')

	console.log("findAllRequests")
	console.log(findAllRequests)

	res.json({
		data: findAllRequests,
		message: `Here aqre all the found request`
	})
})


// POST --> Add frind route
router.post('/addfriend/:id', async (req, res, next) => {
	try {

		const findUser = await User.findById(req.session.userId)

		const findUserToAdd = await User.findById(req.params.id)

		const createNewRequest = {
			sender: req.session.userId,
			recipient: req.params.id
		}


		const createRequest = await Request.create(createNewRequest)

		res.json({
			request: createRequest,
			data: findUser,
			data2: findUserToAdd,
			message: `Here is the foundUsers`
		})
	}
	catch (err) {
		next (err)
	}
})
































module.exports = router

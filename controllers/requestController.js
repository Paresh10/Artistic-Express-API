const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Request = require('../models/request')
const requireAuth = ('../lib/requireAuth')




// GET for individual Requests
router.get('/', async (req, res) => {

	const findAllRequests = await Request.find()
		.populate('sender')
		.populate('recipient')

	res.json({
		data: findAllRequests,
		message: `Here aqre all the found request`
	})
})


// POST --> Add frind route
router.post('/createrequest/:id', async (req, res, next) => {
	try {

		const findUser = await User.findById(req.session.userId)

		const findUserToAdd = await User.findById(req.params.id)

		const createNewRequest = {
			sender: findUser,
			recipient: findUserToAdd
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


// ADD friend
router.post('/notifications/:senderId/:recipientId', async (req, res, next) => {
	
	// if user accepts a frind request than push user in an friends array
	// and delete friend request

	try {

	const sender = await User.findById(req.params.senderId)

	const recipient = await User.findById(req.params.recipientId)	

	const findRequest = await Request.findOne({sender: sender})

	const requestStatus = ({
		status: req.body.status
	})

	if (requestStatus.status === true) {

		sender.friends.push(recipient)
		recipient.friends.push(sender)

		await sender.save()
		await recipient.save()

		const deleteRequest = await Request.findOneAndRemove({sender: sender})

		res.json({
		senderData: sender,
		recipientData: recipient,
		message: ` Friend List was updated`
	})

	}

	else {
		
		// if not then siply delete friend request
		const deleteRequest = await Request.findOneAndRemove({sender: sender})

		res.json({
			message: `Freind Request was deleted`
		})
	}


	}
	catch (err) {
		next(err)
	}

})





























module.exports = router

const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Request = require('../models/request')
const requireAuth = ('../lib/requireAuth')



// Make request only for loggedin users 
router.get('/friendsrequests', async (req, res, next) => {
	try {

	const findLoggedInUser = await User.findById(req.session.userId)

	const findAllRequest = await Request.find().populate('sender').populate('recipient')

	const findUsersRequests = await Request.find({ findLoggedInUser: findAllRequest.recipient })
		.populate('sender')
		.populate('recipient')


		res.json({
			data: findUsersRequests,
			message: `It worked!`
		})
		
	}
	catch (err) {
		next (err)
	}
})




// GET for All Requests
router.get('/', async (req, res) => {

	const findAllRequests = await Request.find()
		.populate('sender')
		.populate('recipient')

	res.json({
		data: findAllRequests,
		message: `Here aqre all the found request`
	})
})


// POST --> Create friend request route
router.post('/createrequest/:id', async (req, res, next) => {
	try {

		const findUser = await User.findById(req.session.userId)

		const findUserToAdd = await User.findById(req.params.id)

		const createNewRequest = {
			sender: findUser,
			recipient: findUserToAdd
		}


		const createRequest = await Request.create(createNewRequest)

		findUser.pendingRequest.push(findUserToAdd)
		findUserToAdd.pendingRequest.push(findUser)

		await findUser.save()
		await findUserToAdd.save()

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





router.put('/notifications/:requestId', async (req, res, next) => {
	try {

		const findRequest = await Request.findById(req.params.requestId)
		.populate('sender')
		.populate('recipient')




		const sender = await User.findOne(findRequest.sender._id)
		const recipient = await User.findOne(findRequest.recipient._id)

 		
		const requestStatus = ({
				status: req.body.status
			})

			if (requestStatus.status === true) {

				sender.friends.push(recipient)
				sender.pendingRequest.pop(recipient)

				recipient.friends.push(sender)
				recipient.pendingRequest.pop(sender)

				await sender.save()
				await recipient.save()

				const deleteRequest = await Request.findOneAndRemove(req.params.requestId)

				res.json({
					data: {
						sender: sender,
						recipient	: recipient
					},
					message: ` Friend List was updated`
				})

			}

			else {
				
				// if not then siply delete friend request
				sender.pendingRequest.pop(recipient)
				recipient.pendingRequest.pop(sender)

				await sender.save()
				await recipient.save()

				const deleteRequest = await Request.findOneAndRemove(req.params.requestId)

				res.json({
					message: `Freind Request was deleted`
				})		
			}
		}
	catch (err) {
		next (err)
	}
})
























module.exports = router

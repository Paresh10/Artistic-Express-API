const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const requireAuth = ('../lib/requireAuth')



// GET Route --> Get ALl The Users
router.get('/', async (req, res, next) => {
	try {
		const getAllTheUser = await User.find()

		res.json({
			data: getAllTheUser,
			message: `Found all ${getAllTheUser.length} users here`
		})
	}

	catch (err) {
		next (err)
	}
})

//GET Route--> ViewProfile
router.get('/:userId', async (req, res, next) => {
	try {
		const findUser = await User.findById(req.params.userId).populate('friends')
		res.json({
			data: findUser,
			message: `Here is your profile`
		})
	}
	catch (err) {
		next(err)
	}
})

// GET Route --> ShowOtherUsersProfile
router.get('/checkprofile/:otherUserId', async (req, res, next) => {
	try {

		const findUserToViewProfile = await User.findById(req.params.otherUserId)
		res.json({
			data: findUserToViewProfile,
			message: `Here is found user`
		})

	}

	catch (err) {
		next (err)
	}
})


// DELETE Route --> Delete User Porfile
router.delete('/:userId', async (req, res, next) => {
	try {
		foundPosts = await Post.deleteMany({
			user: req.params.userId
		})

		foundComments = await Comment.remove({
			user: req.params.userId
		})

		const deleteUser = await User.findOneAndRemove(req.params.userId)
		await req.session.destroy()
		res.json({
			message: `User was deleted`
		})
	}
	catch (err) {
		next (err)
	}
})


// Get Route --> Edit User Profile
router.put('/:userId', async (req, res, next) => {
	try {
		const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
			new: true
		})

		res.json({
			data: updateUser,
			message: `${updateUser.name}'s profile was just updated	`
		})
	}

	catch (err) {
		next (err)
	}
})































module.exports = router
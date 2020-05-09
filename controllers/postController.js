const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const requireAuth = require('../lib/requireAuth')


// GET route
router.get('/', async (req, res, next) => {
	try {
		const findAllPosts = await Post.find().populate('user')
			res.json({
				posts: findAllPosts,
				message: `Here all all the found posts`
			})
	}
	catch(err) {
		next (err)
	}
})


// Show route
router.get('/:postId', requireAuth, async (req, res, next) => {
	try {
		const foundPost = await Post.findById(req.params.postId).populate('user')
		res.json({
			post: foundPost,
			message: `Here is the found post`
		})
	}
	catch (err) {
		next (err)
	}
})


// POST route
router.post('/', async (req, res, next) => {
	try {

		// Define user 
		let currentUser = await User.findById(req.session.userId)

		const createNewPost = ({
			body: req.body.body,
			user: currentUser
		})

		if (req.session.loggedIn == true) {
			const newPost = await Post.create(createNewPost)
			res.json({
				message: `Post has been added` 
			})
		}
		else {
			res.json({
				message: `Please log in first to add post`
			})
		}
	}
	catch(err) {
		next(err)
	}
})



// Delete route
router.delete('/:postId', async (req, res, next) => {
	try {
		deletedPost = await Post.findByIdAndRemove(req.params.postId)
		res.json({
			message: `Post was deleted`
		})
	}
	catch (err) {
		next(err)
	}
})


// Edit route
router.get('/:postId/edit', async (req, res, next) => {
	try {
		const foundPostForEdit = await Post.findById(req.params.postId)
		res.json({
			post: foundPostForEdit,
			message: `Here is the post to be edited`
		})
	}
	catch(err) {
		next(err)
	}
})

















module.exports = router
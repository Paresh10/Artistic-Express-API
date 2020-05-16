const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const requireAuth = ('../lib/requireAuth')


// Get Post for comment routes
router.get('/:postId', async (req, res, next) => {
	
	try {

	const findPost = await Post.findById(req.params.postId)
	.populate({path: 'comments', populate: {path: 'commenter'}})	

	console.log("findPost")
	console.log(findPost)

	res.json({
		data: findPost,
		message: `Found post`
	})
	}
	catch (err) {
		next(err)
	}
})


// Post Create Route --> for comments on post
router.post('/:postId', async (req, res, next) => {
	try {
		const createNewComment = await Comment.create({
			text: req.body.text,
			commenter: req.session.userId
		})

		const selectedPost = await Post.findById(req.params.postId)

		await selectedPost.comments.push(createNewComment)

		await selectedPost.save()

		res.json({
			data: selectedPost,
			message: "Comment was added"
		})
	}
	catch (err) {
		next (err)
	}
})




// Get all comments
router.get('/', async (req, res, next) => {
	try {

		const foundComments = await Comment.find().populate('commenter')

		console.log("foundComments")
		console.log(foundComments)

		res.json({
			data: foundComments,
			message: "Here are the found comments"
		})
	}
	catch (err) {

	}
})











module.exports = router
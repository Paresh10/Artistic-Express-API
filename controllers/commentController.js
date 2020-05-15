const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const requireAuth = ('../lib/requireAuth')


// Post Create Route --> for comments on post
router.post('/:postId', async (req, res, next) => {
	try {
		const createNewComment = await Comment.create(req.body)

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

		const foundComments = await Comment.find().populate('name')

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
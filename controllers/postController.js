const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const requireAuth = require('../lib/requireAuth')


// GET route
router.get('/', async (req, res, next) => {
	try {
		const findAllPosts = await Post.find().populate('user').populate('comments')	
			res.json({
				data: findAllPosts,
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
		const foundPost = await Post.findById(req.params.postId)
		.populate('user')
		.populate({path: 'comments', populate:{path: 'commenter'}})

		res.json({
			data: foundPost,
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
			postPicture: req.body.postPicture,
			user: currentUser
		})

		if (req.session.loggedIn == true) {
			const newPost = await Post.create(createNewPost)
			res.json({
				data: newPost,				
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
			data: foundPostForEdit,
			message: `Here is the post to be edited`
		})
	}
	catch(err) {
		next(err)
	}
})



// Update route
router.put('/:postId', async (req, res, next) => {
	try {

		const postForUpdate = {
			body: req.body.body,
			likes: req.body.likes
		}

		console.log('req.body')
		console.log(req.body)
	
	const updatePost = await Post.findByIdAndUpdate
	(req.params.postId, postForUpdate, { new: true })
	res.json({
		data: updatePost,
		message: `Post was updated`
	})
	
	}
	catch(err) {
		next (err)
	}

})





// Like route
router.put('/likes/:id', async (req, res, next) => {
	try {

		const postForLike = await Post.findById(req.params.id)

		postForLike.likesArray.push(req.session.userId)

		await postForLike.save()

		res.json({
			data: postForLike,
			message: "It worked"
		})


	}
	catch (err) {

	}
})











module.exports = router
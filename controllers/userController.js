const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const requireAuth = ('../lib/requireAuth')



//GET Route--> Show User Profile
router.get('/:userId', async (req, res, next) => {
	try {
		const findUser = await User.findById(req.params.userId)
		res.json({
			data: findUser,
			message: `Here is your profile`
		})
	}
	catch (err) {
		next(err)
	}
})



module.exports = router
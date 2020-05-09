module.exports = (req, res, next) => {
	if (req.session.loggedIn) {
		next()
	}
	else {
		res.json({
			message: "Create an account or log in to continue!"
		})
	}
}
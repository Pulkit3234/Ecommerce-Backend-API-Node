const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		res.status(501).json({ message: 'User not authorized' });
	}

	try {
		const result = await jwt.verify(token, 'thisissecret');
		if (!result) {
			res.status(502).json({ message: 'Not authenticated' });
		}

       
		req.id = result.id;
		next(); //for sending the request to next function it was supposed to reach.
	} catch (error) {
		console.log(error);
		
	}
};


module.exports = authMiddleware;
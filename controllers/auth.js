const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
	const { name, email, password } = req.body;
	//console.log(req.body);

	try {
		const result = await User.findOne({ email });
		console.log(result);
		if (result) {
			res.status(401).json({ message: 'Email Exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({ email, name, password: hashedPassword });
		console.log(user);
		res.status(200).json({ message: 'User registered' });
	} catch (error) {
		console.log(error);
		res.status(402).json({ message: error.message });
	}
};

exports.signin = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const result = await User.findOne({ email });
		if (!result) {
			res.status(404).json({ message: 'User not found' });
		}

		const authenticate = await bcrypt.compare(password, result.password);
		if (!authenticate) {
			res.status(401).json({ message: 'Try again' });
		}

		const token = await jwt.sign({ id: result._id, name: result.name }, 'thisissecret', { expiresIn: '1day' });
		res.status(200).json({ token, name: result.name, email: result.email });
	} catch (error) {
		console.log(error);
		res.status(403).json({ message: 'Some Error Occurred' });
	}
};

exports.editProfile = async (req, res, next) => {
	const { email, name, password } = req.body;

	const id = req.id;
	//const 
	console.log(password)

	try {
		if (password) {
			console.log('password')
			const hashedPassword = await bcrypt.hash(password, 12);
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ name, email, password: hashedPassword },
				{ new: true }
			);

			res.status(200).json({ updatedName: updatedUser.name, updatedEmail: updatedUser.email });
			
		}
		else {
			
			
			const updatedUser = await User.findByIdAndUpdate(
				id,
				{ name, email },
				{ new: true }
			);
			res.status(200).json({ updatedName: updatedUser.name, updatedEmail: updatedUser.email });
		}
		
		
	} catch (error) {
		console.log(error);
		res.status(401).json({ message: error });
	}
};

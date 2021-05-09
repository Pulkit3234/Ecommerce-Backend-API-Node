const express = require('express');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

const stripe = require('stripe')(process.env.Stripe_key);

exports.payment = async (req, res) => {
	const {
		value: { totalPrice },
	} = req.body;
	console.log(totalPrice);

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			description: 'Shop All Order',

			currency: 'inr',
			amount: parseInt(totalPrice),
		});

		res.status(200).json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.log(error);
	}
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		orderItems: [
			{
				name: { type: String },
				qty: { type: Number },
				image: { type: String },
				price: { type: String },
			},
		],
		totalPrice: { type: Number },
		shippingAddress: {
			address: { type: String },
			city: { type: String },
			postalCode: { type: Number },
			country: { type: String },
		},
		paymentMethod: {
			type: String,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			emailAddress: { type: String },
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

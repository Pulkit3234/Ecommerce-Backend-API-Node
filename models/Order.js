const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		cartItems: [
			{
				name: { type: String },
				qty: { type: Number },
				image: { type: String },
				price: { type: String },
				brand: { type: String },
				numReviews: { type: String },
				description: { type: String },
				countInStock: { type: Number },
				
			},
		],
		totalPrice: { type: Number },
		totalItems : {type : Number},
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
		orderStatus: {
			type: String,
			default : 'pending',
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

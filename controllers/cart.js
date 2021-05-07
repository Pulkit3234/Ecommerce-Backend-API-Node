const Order = require('../models/Order');

exports.recieveCart = async (req, res, next) => {
	console.log(req.id);
	const { cartItems, totalPrice, totalItems, wishlist, shippingAddress } = req.body;

	const id = req.id;
	console.log(id);

	try {
		const existingOrder = await Order.findById({ user : id});
        if (existingOrder) {
            
            res.json({ message: 'Order Exists', order: existingOrder });
        }
        else {
            console.log('else')
            const order = new Order({
                user: req.id,
                shippingAddress,
                cartItems,
                totalPrice,
                totalItems,
            });

            const orderCreated = await order.save();
            res.status(200).json({ order: orderCreated });
        }
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
};

exports.sendCart = async (req, res, next) => {
	res.status(200);
};

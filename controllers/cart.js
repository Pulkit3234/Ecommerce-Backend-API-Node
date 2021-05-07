const { findByIdAndUpdate } = require('../models/Order');
const Order = require('../models/Order');

exports.recieveCart = async (req, res, next) => {
	console.log(req.body);
	const { cartItems, totalPrice, totalItems, wishlist, shippingAddress, paymentMethod,} = req.body;

	const id = req.id;
    console.log(id);
    
    try {
       
		if (existingOrder) {
			res.json({ message: 'Order Exists', order: existingOrder });
		} else {
			console.log('else');
			const order = new Order({
				user: req.id,
				shippingAddress,
				cartItems,
				totalPrice,
                totalItems,
                paymentMethod
			});

			const orderCreated = await order.save();
			res.status(200).json({ order: orderCreated });
		}
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
};


exports.orderStatus = async (req, res, next) => {
    const { orderId: id, isPaid } = req.body;
    try {

        const orderUpdated = await findByIdAndUpdate(orderId, { isPaid });
        res.status(200).json({ order: orderUpdated });


        
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    };
};

exports.sendCart = async (req, res, next) => {
	res.status(200);
};

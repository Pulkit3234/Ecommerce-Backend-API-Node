const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/AuthMiddleware');
const Order = require('./models/Order');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/products', async (req, res, next) => {
	try {
		const result = await Product.find();
		console.log('products', result);
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
});

app.get('/product/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		console.log(id);
		const product = await Product.findById(id);
		console.log(product);
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
	}
});

app.use('/', authRoutes);
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);

app.get('/paid', authMiddleware, async (req, res, next) => {
	console.log('paid');
	const id = req.id;
	console.log(id);
	try {
		const result = await Order.find({ user: id });
		if (!result) {
			res.json({
				message: 'No orders placed',
			});
		}
		const paidOrders = result.filter((order) => order.isPaid);

		res.status(200).json({ paidOrders });
	} catch (error) {
		console.log(error);
		res.status(501).json({ message: 'Some error occurred' });
	}
});

const PORT = process.env.PORT || 8000;

mongoose
	.connect('mongodb+srv://username:new@cluster0.6zk4z.mongodb.net/ecommproject?retryWrites=true&w=majority', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => app.listen(PORT, () => console.log('listening')))
	.catch((error) => console.log(error));

const Product = require('./models/Product');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const sampleProducts = require('./data/Products');
const app = express();
//Seeding Sample Data

dotenv.config();

const PORT = process.env.PORT || 8000;
mongoose
	.connect('mongodb+srv://username:new@cluster0.6zk4z.mongodb.net/ecommproject?retryWrites=true&w=majority', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => app.listen(PORT, () => console.log('listening')))
	.catch((error) => console.log(error));

const importData = async () => {
	try {
		await Product.deleteMany();
		const result = await Product.insertMany(sampleProducts);
		console.log('process');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Product.deleteMany();
		console.log('destroyed');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}

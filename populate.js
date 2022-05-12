require("dotenv").config();
const connectionString = process.env.MONGO_URI;
const connectDB = require("./db/connect");
const Product = require("./models/product"); //require the product model

const jsonProducts = require("./products.json"); //require the json data

const start = async () => {
	try {
		await connectDB(connectionString);

		await Product.deleteMany(); //1st delete all the datass from the databse if there was any gibrish data present there beforehand ..
		await Product.create(jsonProducts); //enter the whole array of products in database
		// after all is done exit the process .
		process.exit(0);
	} catch (err) {
		console.log("Something Went Wrong!", err);
		process.exit(1);
	}
};

start();

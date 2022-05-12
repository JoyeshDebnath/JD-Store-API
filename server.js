const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express(); //assign app
const NotFoundMiddleware = require("./middleware/not-found");
const ErrorHandlerMiddleware = require("./middleware/error-handler");
const ProductRoutes = require("./routes/products"); //routes

// express async erreor s
require("express-async-errors");

// requiing ...

//middlewares
app.use(express.json());

//middlewares
// env variables
var PORT = process.env.PORT;
var connectionString = process.env.MONGO_URI;
console.log(connectionString);
// env variabvles
// app.get("/", (req, res) => {
// 	res.json({ msg: "Connected and we are ready to GO !!" });
// });
// routes
app.use("/api/v1/products", ProductRoutes);
// routes
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const start = async () => {
	try {
		//db conection
		await connectDB(connectionString);
		console.log("db connected succes");
		//listen rto the server
		app.listen(PORT, () => {
			console.log(`Listening on port : ${PORT}`);
		});
	} catch (err) {
		res.status(500).json({ msg: "OOPS! something went wrong" });
	}
};

start();

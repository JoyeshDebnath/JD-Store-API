const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required to be provided!"],
	},
	price: {
		type: Number,
		required: [true, "Price is required to be provided!"],
	},
	featured: {
		type: Boolean,
		// required: [true, "Featured must be provided!"],
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},

	company: {
		type: String,
		enum: {
			values: ["caressa", "marcos", "liddy", "ikea"],
			message: "{VALUE} is not supported!",
		},
	},
});

module.exports = mongoose.model("Products", ProductSchema);
